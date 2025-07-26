import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDto, SignUpDto, RefreshTokenDto } from 'src/auth/dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { AccessToken, JwtPayload } from 'src/auth/types';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private config: ConfigService,
    private prisma: PrismaService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<AccessToken> {
    const user = await this.usersService.findOneByEmail(signInDto.email);

    if (!user) throw new UnauthorizedException('Credentials incorrect');

    const isMatch = await bcrypt.compare(signInDto.password, user.password);

    if (!isMatch) throw new UnauthorizedException('Credentials incorrect');

    const { id, email, username } = user;

    return this.signTokens({ sub: id, email, username });
  }

  async signUp(signUpDto: SignUpDto): Promise<AccessToken> {
    const isEmailExists = await this.usersService.findOneByEmail(
      signUpDto.email,
    );
    const isUsernameExists = await this.usersService.findOneByUsername(
      signUpDto.username,
    );

    if (isEmailExists || isUsernameExists) {
      throw new ForbiddenException('Credentials taken');
    }

    const hashPassword = await bcrypt.hash(signUpDto.password, 10);

    const user = await this.usersService.create({
      email: signUpDto.email,
      username: signUpDto.username,
      password: hashPassword,
    });

    const { id, email, username } = user;

    return this.signTokens({ sub: id, email, username });
  }

  async refreshTokens(refreshTokenDto: RefreshTokenDto): Promise<AccessToken> {
    try {
      const payload = await this.jwtService.verifyAsync(
        refreshTokenDto.refresh_token,
        {
          secret: this.config.get('REFRESH_TOKEN_SECRET'),
        },
      );

      const user = await this.usersService.findOneById(payload.sub);

      if (!user || !user.refreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const isValid = await bcrypt.compare(
        refreshTokenDto.refresh_token,
        user.refreshToken,
      );
      if (!isValid) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const { id, email, username } = user;

      return this.signTokens({ sub: id, email, username });
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async signTokens(payload: JwtPayload): Promise<AccessToken> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: '15m',
        secret: this.config.get('TOKEN_SECRET'),
      }),
      this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: this.config.get('REFRESH_TOKEN_SECRET'),
      }),
    ]);

    await this.updateRefreshToken(payload.sub, refreshToken);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async updateRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<void> {
    const hash = await bcrypt.hash(refreshToken, 10);
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: hash },
    });
  }

  async logout(userId: number): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });
  }
}

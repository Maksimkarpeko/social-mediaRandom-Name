import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { SignInDto, SignUpDto } from 'src/auth/dto';
import { AccessToken, AccessTokenDto } from 'src/auth/types';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Sign in with credentials' })
  @ApiResponse({
    status: 200,
    description: 'Returns access token',
    type: AccessTokenDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid credentials',
  })
  @ApiBody({ type: SignInDto })
  signIn(@Body() signInDto: SignInDto): Promise<AccessToken> {
    return this.authService.signIn(signInDto);
  }

  @Post('sign-up')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: AccessTokenDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request - Invalid data' })
  @ApiBody({ type: SignUpDto })
  signUp(@Body() signUpDto: SignUpDto): Promise<AccessToken> {
    return this.authService.signUp(signUpDto);
  }
}

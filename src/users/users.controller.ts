import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from '@prisma/client';
import { JwtGuard } from 'src/common/guards';
import { GetUser } from 'src/common/decorators';
import { FollowsService } from 'src/follows/follows.service';
import { UserWithStatus } from 'src/users/types';
import { EditUserDto } from 'src/users/dto/edit-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config';
import { getImageUrl } from 'src/common/helpers';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private followsService: FollowsService,
  ) {}

  @UseGuards(JwtGuard)
  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'Returns the current user profile' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getMe(@GetUser() user: User): User {
    return user;
  }

  @Post()
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Find users by username' })
  @ApiQuery({
    name: 'username',
    required: true,
    description: 'Username to search for',
  })
  @ApiResponse({ status: 200, description: 'Returns users matching username' })
  findAllByUsername(
    @Query('username') username: string,
    @GetUser() currentUser: User,
  ): Promise<User[]> {
    return this.usersService.findAllByUsername(username, currentUser);
  }

  @UseGuards(JwtGuard)
  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all followed users' })
  @ApiResponse({
    status: 200,
    description: 'Returns users that the current user follows',
  })
  async findAll(@GetUser() currentUser: User) {
    const users = await this.usersService.findAll();

    const usersWithFollowingStatus = await Promise.all(
      users.map(async (user) => {
        const isFollowing = !!(await this.followsService.findOne({
          followerId: user.id,
          followingId: currentUser.id,
        }));
        return { ...user, isFollowing };
      }),
    );

    return usersWithFollowingStatus.filter((user) => user.isFollowing);
  }

  @Patch()
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('image', multerOptions))
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Edit user profile' })
  @ApiBody({ type: EditUserDto })
  @ApiResponse({ status: 200, description: 'Profile updated successfully' })
  edit(
    @UploadedFile() file: Express.Multer.File,
    @GetUser() user: User,
    @Body() editUserDto: EditUserDto,
  ) {
    return this.usersService.edit(user.id, {
      ...editUserDto,
      image: getImageUrl(file?.filename),
    });
  }

  @Get(':username')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user profile by username' })
  @ApiParam({ name: 'username', description: 'Username to fetch profile for' })
  @ApiResponse({ status: 200, description: 'Returns user profile with posts' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findOneByUsername(
    @Param() { username }: { username: string },
    @GetUser() currentUser: User,
  ): Promise<UserWithStatus> {
    const user = await this.usersService.findOneByUsernameWithPosts(username);

    const isFollowing = !!(await this.followsService.findOne({
      followerId: user.id,
      followingId: currentUser.id,
    }));

    const isCurrentUserProfile = user.username === currentUser.username;

    return { ...user, isFollowing, isCurrentUserProfile };
  }
}

import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { SignUpDto } from 'src/auth/dto';
import { EditUserData } from 'src/users/types';
import { FollowsService } from 'src/follows/follows.service';
import { PaginationDto, PaginationResult } from 'src/common/types';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private followsService: FollowsService,
  ) {}

  findOneById(id: number): Promise<User> {
    return this.prisma.user.findFirst({
      where: { id },
    });
  }

  findAllByUsername(username: string, currentUser: User): Promise<User[]> {
    if (!username) return;

    return this.prisma.user.findMany({
      where: {
        username: {
          contains: username,
          mode: 'insensitive',
        },
        id: {
          not: currentUser.id,
        },
      },
    });
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findAllWithPagination(
    paginationDto: PaginationDto,
  ): Promise<PaginationResult<User>> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.user.count(),
    ]);

    const totalPages = Math.ceil(total / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    return {
      data: users,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext,
        hasPrev,
      },
    };
  }

  async findAllFollowingWithPagination(
    paginationDto: PaginationDto,
    currentUserId: number,
  ): Promise<PaginationResult<User>> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    // Get users that the current user follows
    const followingUsers = await this.prisma.user.findMany({
      where: {
        followers: {
          some: {
            followerId: currentUserId,
          },
        },
      },
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    const totalFollowing = await this.prisma.user.count({
      where: {
        followers: {
          some: {
            followerId: currentUserId,
          },
        },
      },
    });

    const totalPages = Math.ceil(totalFollowing / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    return {
      data: followingUsers,
      pagination: {
        page,
        limit,
        total: totalFollowing,
        totalPages,
        hasNext,
        hasPrev,
      },
    };
  }

  findOneByEmail(email: string): Promise<User> {
    return this.prisma.user.findFirst({ where: { email } });
  }

  findOneByUsername(username: string): Promise<User> {
    return this.prisma.user.findFirst({ where: { username } });
  }

  async findOneByUsernameWithPosts(username: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: { username },
      include: {
        posts: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            _count: true,
          },
        },
        _count: { select: { posts: true, followers: true, following: true } },
      },
    });

    if (!user) throw new NotFoundException('user not found');

    delete user.password;
    return user;
  }

  create(data: SignUpDto): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async edit(id: number, data: EditUserData): Promise<User> {
    if (!data.image) delete data.image;

    const userToUpdate = await this.findOneById(id);

    if (data.username && data.username !== userToUpdate.username) {
      const existingUserWithUsername = await this.prisma.user.findFirst({
        where: {
          username: data.username,
          NOT: {
            id: id,
          },
        },
      });

      if (existingUserWithUsername) {
        throw new ConflictException('This username already exists');
      }
    }

    return this.prisma.user.update({ where: { id }, data });
  }
}

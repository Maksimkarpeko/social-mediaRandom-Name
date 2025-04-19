import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostsService } from 'src/posts/posts.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config';
import { JwtGuard } from 'src/common/guards';
import { GetUser } from 'src/common/decorators';
import { Post as PostType, User } from '@prisma/client';
import { CreatePostDto, EditPostDto } from 'src/posts/dto';
import { LikesService } from 'src/likes/likes.service';
import { getImageUrl } from 'src/common/helpers';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(
    private postsService: PostsService,
    private likesService: LikesService,
  ) {}

  @Get()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({
    status: 200,
    description: 'Returns all posts with like status',
  })
  async findAll(@GetUser() user: User): Promise<PostType[]> {
    const posts = await this.postsService.findAll();

    return await Promise.all(
      posts.map(async (post) => {
        const isEditable = post.userId === user.id;
        const isUpdated =
          new Date(post.updatedAt).getTime() !==
          new Date(post.createdAt).getTime();

        const isLiked = !!(await this.likesService.findOne({
          postId: post.id,
          userId: user.id,
        }));
        return { ...post, isLiked, isEditable, isUpdated };
      }),
    );
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get post by ID' })
  @ApiParam({ name: 'id', description: 'Post ID' })
  @ApiResponse({ status: 200, description: 'Returns post with like status' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  async findOne(@Param() { id }: { id: string }, @GetUser() user: User) {
    const post = await this.postsService.findOne(+id);

    const isEditable = post.userId === user.id;
    const isUpdated =
      new Date(post.updatedAt).getTime() !== new Date(post.createdAt).getTime();
    const isLiked = !!(await this.likesService.findOne({
      postId: post.id,
      userId: user.id,
    }));

    return { ...post, isLiked, isEditable, isUpdated };
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('image', multerOptions))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Edit a post' })
  @ApiParam({ name: 'id', description: 'Post ID to edit' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: EditPostDto })
  @ApiResponse({ status: 200, description: 'Post updated successfully' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  edit(
    @Param() { id }: { id: string },
    @UploadedFile() file: Express.Multer.File,
    @Body() editPostDto: EditPostDto,
  ): Promise<PostType> {
    return this.postsService.edit(+id, {
      content: editPostDto.content,
      image: file ? getImageUrl(file.filename) : null,
    });
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a post' })
  @ApiParam({ name: 'id', description: 'Post ID to delete' })
  @ApiResponse({ status: 200, description: 'Post deleted successfully' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  delete(@Param() { id }: { id: string }) {
    return this.postsService.delete(+id);
  }

  @Post()
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('image', multerOptions))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreatePostDto })
  @ApiResponse({ status: 201, description: 'Post created successfully' })
  create(
    @UploadedFile() file: Express.Multer.File,
    @GetUser() user: User,
    @Body() createPostDto: CreatePostDto,
  ): Promise<PostType> {
    return this.postsService.create({
      userId: user.id,
      content: createPostDto.content,
      image: getImageUrl(file.filename),
    });
  }
}

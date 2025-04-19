import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    description: 'The content of the post',
    example: 'This is my new post!',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: 'The image file for the post',
    type: 'string',
    format: 'binary',
    required: false,
  })
  image?: any;
}

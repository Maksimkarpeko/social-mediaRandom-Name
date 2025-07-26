import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class UserWithFollowingDto implements User {
  @ApiProperty({ description: 'User ID' })
  id: number;

  @ApiProperty({ description: 'Username' })
  username: string;

  @ApiProperty({ description: 'Email address' })
  email: string;

  @ApiProperty({ description: 'First name', required: false })
  firstName: string | null;

  @ApiProperty({ description: 'Last name', required: false })
  lastName: string | null;

  @ApiProperty({ description: 'Location', required: false })
  location: string | null;

  @ApiProperty({ description: 'Birthday', required: false })
  birthday: Date | null;

  @ApiProperty({ description: 'Address', required: false })
  address: string | null;

  @ApiProperty({ description: 'Country', required: false })
  country: string | null;

  @ApiProperty({ description: 'Bio', required: false })
  bio: string | null;

  @ApiProperty({ description: 'Profile image URL' })
  image: string | null;

  @ApiProperty({ description: 'Refresh token', required: false })
  refreshToken: string | null;

  @ApiProperty({ description: 'Creation date' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update date' })
  updatedAt: Date;

  @ApiProperty({
    description: 'Whether the current user is following this user',
  })
  isFollowing: boolean;

  // Exclude password from the response
  password: string;
}

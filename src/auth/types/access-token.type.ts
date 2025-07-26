import { ApiProperty } from '@nestjs/swagger';

export type AccessToken = {
  access_token: string;
  refresh_token: string;
};

export class AccessTokenDto {
  @ApiProperty({ description: 'JWT access token' })
  access_token: string;

  @ApiProperty({ description: 'JWT refresh token' })
  refresh_token: string;
}

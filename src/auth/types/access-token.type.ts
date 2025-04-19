import { ApiProperty } from '@nestjs/swagger';

export type AccessToken = { access_token: string };

export class AccessTokenDto {
  @ApiProperty({ description: 'JWT access token' })
  access_token: string;
}

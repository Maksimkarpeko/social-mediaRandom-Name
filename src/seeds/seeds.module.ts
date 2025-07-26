import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';
import { SeedsService } from './seeds.service';
import { SeedsController } from './seeds.controller';

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [SeedsController],
  providers: [SeedsService],
  exports: [SeedsService],
})
export class SeedsModule {}

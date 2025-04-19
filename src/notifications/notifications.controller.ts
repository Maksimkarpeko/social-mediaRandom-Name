import { Controller, Get, UseGuards } from '@nestjs/common';
import { NotificationsService } from 'src/notifications/notifications.service';
import { JwtGuard } from 'src/common/guards';
import { GetUser } from 'src/common/decorators';
import { Notification, User } from '@prisma/client';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @Get()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all notifications for current user' })
  @ApiResponse({ status: 200, description: 'Returns list of notifications' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll(@GetUser() user: User): Promise<Notification[]> {
    return this.notificationsService.findAll(user.id);
  }
}

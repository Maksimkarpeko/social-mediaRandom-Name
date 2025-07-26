import { Controller, Post, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { SeedsService } from './seeds.service';

@Controller('seeds')
export class SeedsController {
  constructor(private readonly seedsService: SeedsService) {}

  @Post('run')
  @HttpCode(HttpStatus.OK)
  async runSeeds(): Promise<{ message: string }> {
    await this.seedsService.runSeeds();
    return { message: 'Seeds completed successfully' };
  }

  @Post('users')
  @HttpCode(HttpStatus.OK)
  async createMockUsers(): Promise<{ message: string }> {
    await this.seedsService.createMockUsers(100);
    return { message: 'Mock users created successfully' };
  }

  @Get('status')
  async getStatus(): Promise<{ isEmpty: boolean }> {
    const isEmpty = await this.seedsService.isDatabaseEmpty();
    return { isEmpty };
  }

  @Post('admin/test')
  @HttpCode(HttpStatus.OK)
  async testEndpoint(): Promise<{ message: string; timestamp: string }> {
    return {
      message: 'Seeds controller is working',
      timestamp: new Date().toISOString(),
    };
  }
}

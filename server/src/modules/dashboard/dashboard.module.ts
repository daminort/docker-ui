import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { CoreModule } from '../../core/core.module';

@Module({
  imports: [CoreModule],
  providers: [DashboardService],
  controllers: [DashboardController]
})
export class DashboardModule {}

import { Controller, Get, Param } from '@nestjs/common';

import { config } from '../../config';
import { DashboardService } from './dashboard.service';

@Controller(config.routes.dashboard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('/stats/subscribe')
  async statsSubscribe(): Promise<boolean> {
    return this.dashboardService.statsSubscribe();
  }

  @Get('/stats/unsubscribe')
  async statsUnsubscribe(): Promise<boolean> {
    return this.dashboardService.statsUnsubscribe();
  }
}

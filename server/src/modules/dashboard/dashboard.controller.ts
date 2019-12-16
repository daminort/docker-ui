import { Controller, Get, Param } from '@nestjs/common';

import { config } from '../../config';
import { DashboardService } from './dashboard.service';

@Controller(config.routes.dashboard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  async statsList(): Promise<any> {
    return this.dashboardService.statsList();
  }
}

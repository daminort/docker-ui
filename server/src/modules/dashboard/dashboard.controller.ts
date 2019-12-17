import { Controller, Post, Body } from '@nestjs/common';

import { config } from '../../config';
import { DashboardService } from './dashboard.service';
import { LogsSubscribeDto } from './dto/logs-subscribe.dto';

@Controller(config.routes.dashboard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Post('/stats/subscribe')
  async statsSubscribe(): Promise<boolean> {
    return this.dashboardService.statsSubscribe();
  }

  @Post('/stats/unsubscribe')
  async statsUnsubscribe(): Promise<boolean> {
    return this.dashboardService.statsUnsubscribe();
  }

  @Post('/logs/subscribe')
  async logsSubscribe(@Body() body: LogsSubscribeDto): Promise<boolean> {
    const { containerID } = body;
    return this.dashboardService.logsSubscribe(containerID);
  }

  @Post('/logs/unsubscribe')
  async logsUnsubscribe(@Body() body: LogsSubscribeDto): Promise<boolean> {
    const { containerID } = body;
    return this.dashboardService.logsUnsubscribe(containerID);
  }
}

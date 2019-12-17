import Timeout = NodeJS.Timeout;
import { Injectable } from '@nestjs/common';

import { DockerService } from '../../core/docker.service';
import { LoggerService } from '../../core/logger.service';
import { StringUtilsService } from '../../core/string-utils.service';
import { ParseTableOptions } from '../../core/interfaces/string-utils.interface';
import { SocketGateway } from '../../core/socket.gateway';
import { SocketEventsEnum } from '../../common/enum/socket.enum';

import { StatsDto } from './dto/stats.dto';

@Injectable()
export class DashboardService {

  private statsInterval: Timeout = null;
  private statsDelay = 5000;

  private readonly parseStatsOptions: ParseTableOptions = {
    columns: [
      { name: 'containerID', value: 'CONTAINER ID' },
      { name: 'name', value: 'NAME' },
      { name: 'cpuUsage', value: 'CPU %' },
      { name: 'memUsageLimit', value: 'MEM USAGE / LIMIT' },
      { name: 'memUsage', value: 'MEM %' },
      { name: 'netIO', value: 'NET I/O' },
      { name: 'blockIO', value: 'BLOCK I/O' },
      { name: 'pid', value: 'PIDS' },
    ],
  };

  constructor(
    private readonly dockerService: DockerService,
    private readonly loggerService: LoggerService,
    private readonly stringUtilsService: StringUtilsService,
    private readonly socketGateway: SocketGateway,
  ) {}

  async statsSubscribe(): Promise<boolean> {
    if (this.statsInterval) {
      clearInterval(this.statsInterval);
      this.loggerService.dashboardLog('Current stats interval is cleared before new subscribing');
    }

    await this.getStats();
    this.statsInterval = setInterval(async () => {
      await this.getStats();
    }, this.statsDelay);

    this.loggerService.dashboardLog('It has subscribed successfully');
    return Promise.resolve(true);
  }

  async statsUnsubscribe(): Promise<boolean> {
    if (this.statsInterval) {
      clearInterval(this.statsInterval);
      this.loggerService.dashboardLog('Current stats interval is cleared before unsubscribing');
    }

    this.loggerService.dashboardLog('It has unsubscribed successfully');
    return Promise.resolve(true);
  }

  async getStats(): Promise<void> {
    const list = await this.dockerService.statsList();
    const table: StatsDto[] = await this.stringUtilsService.parseTable<StatsDto>(list, this.parseStatsOptions);

    await this.socketGateway.sendToAll(SocketEventsEnum.dashboardStats, table);

    return Promise.resolve();
  }
}

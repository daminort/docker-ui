import Timeout = NodeJS.Timeout;

import { ChildProcess } from 'child_process';
import { Injectable } from '@nestjs/common';

import { DockerService } from '../../core/docker.service';
import { LoggerService } from '../../core/logger.service';
import { StringUtilsService } from '../../core/string-utils.service';
import { ParseTableOptions } from '../../core/interfaces/string-utils.interface';
import { SocketGateway } from '../../core/socket.gateway';
import { SocketEventsEnum } from '../../common/enum/socket.enum';

import { StatsDto } from './dto/stats.dto';
import { LogsDto } from './dto/logs.dto';

@Injectable()
export class DashboardService {

  private statsInterval: Timeout = null;
  private statsDelay = 5000;
  private logProcesses: Map<string, ChildProcess> = new Map();

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

  // Stats ------------------------------------------------------------------------------------------------------------

  async statsSubscribe(): Promise<boolean> {
    if (this.statsInterval) {
      clearInterval(this.statsInterval);
      this.loggerService.dashboardLog('Current stats interval is cleared before new subscribing');
    }

    await this.sendStats();
    this.statsInterval = setInterval(async () => {
      await this.sendStats();
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

  async sendStats(): Promise<void> {
    const list = await this.dockerService.statsList();
    const table: StatsDto[] = await this.stringUtilsService.parseTable<StatsDto>(list, this.parseStatsOptions);

    await this.socketGateway.sendToAll(SocketEventsEnum.dashboardStats, table);

    return Promise.resolve();
  }

  // Logs -------------------------------------------------------------------------------------------------------------

  async logsSubscribe(containerID: string): Promise<boolean> {

    const cid = containerID.slice(0, 12);
    const existedProcess = this.logProcesses.get(containerID);
    if (existedProcess) {
      existedProcess.kill();
      this.loggerService.dashboardLog(`Killed existed logs process for container ${cid} before creating the new one`);
    }

    const onDataCallback = (data: Buffer) => {
      this.sendLogs(containerID, data);
    }
    const process = await this.dockerService.spawnContainerLogs(containerID, onDataCallback);

    this.logProcesses.set(containerID, process);
    this.loggerService.dashboardLog(`Subscribed to logs for container ${cid}`);

    return Promise.resolve(true);
  }

  async logsUnsubscribe(containerID: string): Promise<boolean> {

    const cid = containerID.slice(0, 12);
    const existedProcess = this.logProcesses.get(containerID);
    if (existedProcess) {
      existedProcess.kill();
      this.loggerService.dashboardLog(`Killed existed logs process for container ${cid} before unsubscribing`);
    }

    this.logProcesses.set(containerID, null);

    this.loggerService.dashboardLog(`Unsubscribed from logs of container ${cid}`);
    return Promise.resolve(true);
  }

  async sendLogs(containerID: string, buffer: Buffer): Promise<void> {
    const logsData = buffer.toString();
    const logs = logsData.split('\n');

    const payload: LogsDto = {
      containerID,
      logs,
    }

    await this.socketGateway.sendToAll(SocketEventsEnum.dashboardLogs, payload);
    return Promise.resolve();
  }
}

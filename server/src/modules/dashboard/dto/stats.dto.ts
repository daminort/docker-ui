
export class StatsDto {
  readonly containerID: string;
  readonly name: string;
  readonly cpuUsage: string;
  readonly memUsageLimit: string;
  readonly memUsage: string;
  readonly netIO: string;
  readonly blockIO: string;
  readonly pid: string;
}

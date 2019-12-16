import { Injectable } from '@nestjs/common';

import { DockerService } from '../../core/docker.service';
import { StringUtilsService } from '../../core/string-utils.service';

@Injectable()
export class DashboardService {

  constructor(
    private readonly dockerService: DockerService,
    private readonly stringUtilsService: StringUtilsService,
  ) {}

  async statsList(): Promise<any> {
    return Promise.resolve('Will be implemented soon...');
  }
}

import { Controller, Get, Param } from '@nestjs/common';

import { config } from '../../config';
import { ContainerService } from './container.service';
import { ContainerDto } from '../container/dto/container.dto';

@Controller(config.routes.containers)
export class ContainerController {
  constructor(private readonly containerService: ContainerService) {}

  @Get()
  async containersList(): Promise<ContainerDto[]> {
    return this.containerService.containersList();
  }

  @Get('/:id/inspect')
  async containerInspect(@Param('id') containerID: string): Promise<any> {
    return this.containerService.containerInspect(containerID);
  }
}

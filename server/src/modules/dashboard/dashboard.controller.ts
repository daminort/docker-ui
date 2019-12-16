import { Controller, Get } from '@nestjs/common';

import { config } from '../../config';
import { DashboardService } from './dashboard.service';
import { ContainerDto } from './dto/container.dto';
import { ImageDto } from './dto/image.dto';
import { VolumeDto } from './dto/volume.dto';

@Controller(`${config.api.baseURL}/dashboard`)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('/containers')
  async containersList(): Promise<ContainerDto[]> {
    return this.dashboardService.containersList();
  }

  @Get('/images')
  async imagesList(): Promise<ImageDto[]> {
    return this.dashboardService.imagesList();
  }

  @Get('/volumes')
  async volumesList(): Promise<VolumeDto[]> {
    return this.dashboardService.volumesList();
  }
}

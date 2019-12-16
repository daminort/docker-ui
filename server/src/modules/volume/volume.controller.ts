import { Controller, Get, Param } from '@nestjs/common';

import { config } from '../../config';
import { VolumeService } from './volume.service';
import { VolumeDto } from '../volume/dto/volume.dto';

@Controller(config.routes.volumes)
export class VolumeController {
  constructor(private readonly volumeService: VolumeService) {}

  @Get()
  async volumesList(): Promise<VolumeDto[]> {
    return this.volumeService.volumesList();
  }

  @Get('/:name/inspect')
  async volumeInspect(@Param('name') volumeName: string): Promise<any> {
    return this.volumeService.volumeInspect(volumeName);
  }
}

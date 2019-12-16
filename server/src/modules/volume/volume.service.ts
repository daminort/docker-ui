import { Injectable } from '@nestjs/common';

import { DockerService } from '../../core/docker.service';
import { StringUtilsService } from '../../core/string-utils.service';
import { ParseTableOptions } from '../../core/interfaces/string-utils.interface';
import { VolumeDto } from '../volume/dto/volume.dto';

@Injectable()
export class VolumeService {

  private readonly parseVolumesOptions: ParseTableOptions = {
    columns: [
      { name: 'driver', value: 'DRIVER' },
      { name: 'volumeName', value: 'VOLUME NAME' },
    ],
  };

  constructor(
    private readonly dockerService: DockerService,
    private readonly stringUtilsService: StringUtilsService,
  ) {}

  async volumesList(): Promise<VolumeDto[]> {
    const list: string = await this.dockerService.volumesList();
    const table: VolumeDto[] = await this.stringUtilsService.parseTable<VolumeDto>(list, this.parseVolumesOptions);

    return Promise.resolve(table);
  }

  async volumeInspect(volumeName: string): Promise<any> {
    return this.dockerService.volumeInspect(volumeName);
  }
}

import { Injectable } from '@nestjs/common';

import { DockerService } from '../../core/docker.service';
import { ContainerDto } from './dto/container.dto';
import { StringUtilsService } from '../../core/string-utils.service';
import { ParseTableOptions } from '../../core/interfaces/string-utils.interface';
import { ImageDto } from './dto/image.dto';
import { VolumeDto } from './dto/volume.dto';

@Injectable()
export class DashboardService {

  private readonly parseContainersOptions: ParseTableOptions = {
    columns: [
      { name: 'containerID', value: 'CONTAINER ID' },
      { name: 'imageID', value: 'IMAGE' },
      { name: 'command', value: 'COMMAND' },
      { name: 'created', value: 'CREATED' },
      { name: 'status', value: 'STATUS' },
      { name: 'ports', value: 'PORTS' },
      { name: 'name', value: 'NAMES' },
      { name: 'size', value: 'SIZE' },
    ],
  };

  private readonly parseImagesOptions: ParseTableOptions = {
    columns: [
      { name: 'repository', value: 'REPOSITORY' },
      { name: 'tag', value: 'TAG' },
      { name: 'imageID', value: 'IMAGE ID' },
      { name: 'created', value: 'CREATED' },
      { name: 'size', value: 'SIZE' },
    ],
  };

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

  async containersList(): Promise<ContainerDto[]> {
    const list: string = await this.dockerService.containersList();
    const table: ContainerDto[] = await this.stringUtilsService.parseTable<ContainerDto>(list, this.parseContainersOptions);

    return Promise.resolve(table);
  }

  async imagesList(): Promise<ImageDto[]> {
    const list: string = await this.dockerService.imagesList();
    const table: ImageDto[] = await this.stringUtilsService.parseTable<ImageDto>(list, this.parseImagesOptions);

    return Promise.resolve(table);
  }

  async volumesList(): Promise<VolumeDto[]> {
    const list: string = await this.dockerService.volumesList();
    const table: VolumeDto[] = await this.stringUtilsService.parseTable<VolumeDto>(list, this.parseVolumesOptions);

    return Promise.resolve(table);
  }
}

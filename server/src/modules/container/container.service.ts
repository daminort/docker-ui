import { Injectable } from '@nestjs/common';

import { DockerService } from '../../core/docker.service';
import { ContainerDto } from '../container/dto/container.dto';
import { StringUtilsService } from '../../core/string-utils.service';
import { ParseTableOptions } from '../../core/interfaces/string-utils.interface';
import {
  StringTransformTypes as Transform
} from '../../common/enum/string-transform-types.enum';

@Injectable()
export class ContainerService {

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
    transforms: [
      { type: Transform.shortID, columnName: 'containerID', resultName: 'shortID' },
      { type: Transform.shortID, columnName: 'imageID', resultName: 'shortImageID' },
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

  async containerInspect(containerID: string): Promise<any> {
    return this.dockerService.containerInspect(containerID);
  }
}

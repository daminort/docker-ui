import { Injectable } from '@nestjs/common';

import { DockerService } from '../../core/docker.service';
import { StringUtilsService } from '../../core/string-utils.service';
import { ParseTableOptions } from '../../core/interfaces/string-utils.interface';
import { ImageDto } from '../image/dto/image.dto';
import { ImageHistoryDto, ImageHistoryResponseDto } from '../image/dto/image-history.dto';

@Injectable()
export class ImageService {

  private readonly parseImagesOptions: ParseTableOptions = {
    columns: [
      { name: 'repository', value: 'REPOSITORY' },
      { name: 'tag', value: 'TAG' },
      { name: 'imageID', value: 'IMAGE ID' },
      { name: 'created', value: 'CREATED' },
      { name: 'size', value: 'SIZE' },
    ],
  };

  private readonly parseImageHistoryOptions: ParseTableOptions = {
    columns: [
      { name: 'imageID', value: 'IMAGE' },
      { name: 'created', value: 'CREATED' },
      { name: 'command', value: 'CREATED BY' },
      { name: 'size', value: 'SIZE' },
      { name: 'comment', value: 'COMMENT' },
    ],
  };

  constructor(
    private readonly dockerService: DockerService,
    private readonly stringUtilsService: StringUtilsService,
  ) {}

  async imagesList(): Promise<ImageDto[]> {
    const list: string = await this.dockerService.imagesList();
    const table: ImageDto[] = await this.stringUtilsService.parseTable<ImageDto>(list, this.parseImagesOptions);

    return Promise.resolve(table);
  }

  async imageHistory(imageID: string): Promise<ImageHistoryResponseDto> {
    const list: string = await this.dockerService.imageHistory(imageID);
    const table: ImageHistoryDto[] = await this.stringUtilsService.parseTable<ImageHistoryDto>(list, this.parseImageHistoryOptions);

    const result: ImageHistoryResponseDto = {
      imageID,
      history: table.map(row => {
        const { command } = row;
        if (!row) {
          return '';
        }

        return command
        .replace('/bin/sh -c #(nop)', '')
        .replace('/bin/sh -c', '')
        .trim();
      }).reverse(),
    };

    return Promise.resolve(result);
  }

  async imageInspect(imageID: string): Promise<any> {
    return this.dockerService.imageInspect(imageID);
  }
}

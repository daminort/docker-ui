import { Controller, Get, Param } from '@nestjs/common';

import { config } from '../../config';
import { ImageService } from './image.service';
import { ImageDto } from '../image/dto/image.dto';
import { ImageHistoryResponseDto } from '../image/dto/image-history.dto';

@Controller(config.routes.images)
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get()
  async imagesList(): Promise<ImageDto[]> {
    return this.imageService.imagesList();
  }

  @Get('/:id/history')
  async imageHistory(@Param('id') imageID: string): Promise<ImageHistoryResponseDto> {
    return this.imageService.imageHistory(imageID);
  }

  @Get('/:id/inspect')
  async imageInspect(@Param('id') imageID: string): Promise<any> {
    return this.imageService.imageInspect(imageID);
  }
}

import { Module } from '@nestjs/common';

import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { CoreModule } from '../../core/core.module';

@Module({
  imports: [CoreModule],
  providers: [ImageService],
  controllers: [ImageController]
})
export class ImageModule {}

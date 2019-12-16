import { Module } from '@nestjs/common';
import { VolumeService } from './volume.service';
import { VolumeController } from './volume.controller';
import { CoreModule } from '../../core/core.module';

@Module({
  imports: [CoreModule],
  providers: [VolumeService],
  controllers: [VolumeController]
})
export class VolumeModule {}

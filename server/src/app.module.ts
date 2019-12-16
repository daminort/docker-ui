import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { ContainerModule } from './modules/container/container.module';
import { ImageModule } from './modules/image/image.module';
import { VolumeModule } from './modules/volume/volume.module';

@Module({
  imports: [CoreModule, DashboardModule, ContainerModule, ImageModule, VolumeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

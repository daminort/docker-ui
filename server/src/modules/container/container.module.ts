import { Module } from '@nestjs/common';
import { ContainerService } from './container.service';
import { ContainerController } from './container.controller';
import { CoreModule } from '../../core/core.module';

@Module({
  imports: [CoreModule],
  providers: [ContainerService],
  controllers: [ContainerController]
})
export class ContainerModule {}

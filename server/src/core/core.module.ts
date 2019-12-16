import { Module } from '@nestjs/common';

import { DockerService } from './docker.service';
import { LoggerService } from './logger.service';
import { StringUtilsService } from './string-utils.service';

@Module({
  providers: [
    DockerService,
    LoggerService,
    StringUtilsService,
  ],
  exports: [
    DockerService,
    LoggerService,
    StringUtilsService,
  ]
})
export class CoreModule {}

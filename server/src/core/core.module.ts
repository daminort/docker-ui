import { Module } from '@nestjs/common';

import { DockerService } from './docker.service';
import { LoggerService } from './logger.service';
import { StringUtilsService } from './string-utils.service';
import { SocketGateway } from './socket.gateway';

@Module({
  providers: [
    DockerService,
    LoggerService,
    StringUtilsService,
    SocketGateway,
  ],
  exports: [
    DockerService,
    LoggerService,
    StringUtilsService,
    SocketGateway,
  ]
})
export class CoreModule {}

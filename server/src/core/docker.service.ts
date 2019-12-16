import * as util from 'util';
import { exec } from 'child_process';
import { Injectable } from '@nestjs/common';

import { LoggerService } from './logger.service';

const asyncExec = util.promisify(exec);

const commands = {
  containers: 'docker ps --all --size --no-trunc',
  images: 'docker images --all --no-trunc',
  volumes: 'docker volume ls',
}

@Injectable()
export class DockerService {
  constructor(private readonly loggerService: LoggerService) {}

  async executeCommand(command): Promise<string> {
    try {
      const { stdout, stderr } = await asyncExec(command);
      if (!stderr) {
        return Promise.resolve(stdout);
      }

      return Promise.reject(stdout);

    } catch (err) {
      return Promise.reject(err);
    }
  }

  async containersList(): Promise<string> {
    return this.executeCommand(commands.containers);
  }

  async imagesList(): Promise<string> {
    return this.executeCommand(commands.images);
  }

  async volumesList(): Promise<string> {
    return this.executeCommand(commands.volumes);
  }
}

import * as util from 'util';
import { exec } from 'child_process';
import { Injectable } from '@nestjs/common';

import { LoggerService } from './logger.service';

const asyncExec = util.promisify(exec);

const commands = {
  containers: 'docker ps --all --size --no-trunc',
  images: 'docker images --all --no-trunc',
  volumes: 'docker volume ls',
  stats: 'docker stats --no-stream --no-trunc',

  imageHistory: (imageID: string) => `docker history ${imageID} --no-trunc`,

  containerInspect: (containerID: string) => `docker inspect ${containerID}`,
  imageInspect: (imageID: string) => `docker inspect ${imageID}`,
  volumeInspect: (volumeName: string) => `docker volume inspect ${volumeName}`,
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

  async executeInspectCommand(command): Promise<any> {
    try {
      const { stdout, stderr } = await asyncExec(command);
      if (!stderr) {
        const res = JSON.parse(stdout);
        return Promise.resolve(res);
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

  async statsList(): Promise<string> {
    return this.executeCommand(commands.stats);
  }

  async imageHistory(imageID: string): Promise<string> {
    return this.executeCommand(commands.imageHistory(imageID));
  }

  async containerInspect(containerID: string): Promise<any> {
    return this.executeInspectCommand(commands.containerInspect(containerID));
  }

  async imageInspect(imageID: string): Promise<any> {
    return this.executeInspectCommand(commands.imageInspect(imageID));
  }

  async volumeInspect(volumeName: string): Promise<any> {
    return this.executeInspectCommand(commands.volumeInspect(volumeName));
  }
}

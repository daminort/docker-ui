import * as util from 'util';
import { exec } from 'child_process';
import { Injectable } from '@nestjs/common';

import { LoggerService } from './logger.service';

const asyncExec = util.promisify(exec);

@Injectable()
export class DockerService {
  constructor(private readonly loggerService: LoggerService) {}

  async containersList(): Promise<string> {
    try {
      const { stdout, stderr } = await asyncExec('docker ps --all --size --no-trunc');
      if (!stderr) {
        return Promise.resolve(stdout);
      }

      return Promise.reject(stdout);

    } catch (err) {
      return Promise.reject(err);
    }
  }
}

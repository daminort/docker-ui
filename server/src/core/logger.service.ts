import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggerService extends Logger {

  prefixedLog(prefix: string, message: any, context?: string) {
    if (typeof message === 'string') {
      super.log(`[${prefix}] ${message}`, context);
      return;
    }

    super.log(prefix);
    super.log(message, context);
  }

  dashboardLog(message: any, context?: string) {
    this.prefixedLog('Dashboard', message, context);
  }

  socketLog(message: any, context?: string) {
    this.prefixedLog('Socket', message, context);
  }
}

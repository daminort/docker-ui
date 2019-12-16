import { NestFactory } from '@nestjs/core';

import { config } from './config';
import { AppModule } from './app.module';
import { LoggerService } from './core/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
  });

  const logger = app.get(LoggerService);
  app.useLogger(logger);

  await app.listen(config.api.port);
  logger.log(`Listening on ${config.api.port} port`);
}

bootstrap();

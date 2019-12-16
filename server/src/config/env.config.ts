import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as Joi from '@hapi/joi';
import { resolve } from 'path';

import { LoggerService } from '../core/logger.service';

const envSchema: Joi.ObjectSchema = Joi.object({
  API_URL: Joi.string().required(),
  API_PORT: Joi.number().required(),
  API_VERSION: Joi.string().required(),
  SITE_URL: Joi.string().required(),
  SITE_PORT: Joi.number(),
});

const getEnv = () => {
  const mode = process.env.NODE_ENV || 'development';
  const envFileName = resolve(__dirname, '..', '..', `.env.${mode}`);

  let envConfig = null;
  try {
    envConfig = dotenv.parse(fs.readFileSync(envFileName));

  } catch (err) {
    LoggerService.error(`File not found: ${envFileName}`);
    process.exit(1);
  }

  const { error, value } = envSchema.validate(envConfig, {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  });

  if (error) {
    LoggerService.error('ENV validation errors:');
    error.details.map(e => LoggerService.log(`  - ${e.message}`));
    process.exit(1);
  }

  return {
    ...value,
    NODE_ENV: mode,
  };
};

export const env = getEnv();
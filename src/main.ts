import { NestFactory } from '@nestjs/core';
import { Logger, Get } from '@nestjs/common';
import { AppModule } from './app.module';
import * as config from 'config/';
async function bootstrap() {
  // const serverConfig = config.get('server');
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  // console.log(serverConfig);
  // const port = serverConfig.port;
  const port = 3000;
  await app.listen(port);
  logger.log(`Application listening to port ${port}`);
}
bootstrap();

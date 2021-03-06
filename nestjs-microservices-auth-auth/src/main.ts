import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { AUTH_HOST } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors:true});
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: AUTH_HOST,
      port: 4000
    }
  })

  await app.startAllMicroservicesAsync();
  await app.listen(3000);
  Logger.log('Auth microservice running');
}
bootstrap();

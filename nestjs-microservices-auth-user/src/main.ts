import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { USER_HOST } from './user/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors:true});

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: USER_HOST,
      port: 4010
    }
  });

  await app.startAllMicroservicesAsync();
  await app.listen(3010);
  Logger.log('User microservice running');
}
bootstrap();

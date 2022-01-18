import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { BOOK_HOST } from './books/config';

async function bootstrap() { 
  const app = await NestFactory.create(AppModule, {cors:true});

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: BOOK_HOST,
      port: 4020
    }
  })

  await app.startAllMicroservices();
  await app.listen(3020);
}
bootstrap();

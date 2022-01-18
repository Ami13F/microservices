import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AUTH_HOST } from './config';

@Module({
  imports: [ClientsModule.register([{
    name: 'AUTH_CLIENT',
    transport: Transport.TCP,
    options: {
      host: AUTH_HOST,
      port: 4000,
    }}])],
  controllers: [BooksController],
  providers: [BooksService]
})
export class BooksModule {}

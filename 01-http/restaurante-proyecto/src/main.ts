import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as path from "path";
import * as express from 'express';
import * as favicon from 'serve-favicon';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(favicon(path.join(__dirname, '..', 'publico', 'imagenes', 'perrito.ico')))


  // @ts-ignore
  app.set('view engine', 'ejs');
  // app.set('view engine', 'ejs');
  app.use(express.static('publico'));
  await app.listen(3000);
}
bootstrap();
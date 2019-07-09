import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cookieParser = require('cookie-parser');

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  // @ts-ignore
  app.set('view engine', 'ejs');
  app.use(cookieParser('Seguro'));
  await app.listen(3003);

}
bootstrap();

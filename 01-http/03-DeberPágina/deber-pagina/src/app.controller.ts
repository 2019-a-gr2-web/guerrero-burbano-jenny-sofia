import { Controller, Get, Response } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/Hola')
  getHello(): string {
    return 'Hello world';
  }
  @Get('/paginaNpm')
  paginaNpm(@Response() res) {
    return res.render('inicioNpm', { });
  }

}

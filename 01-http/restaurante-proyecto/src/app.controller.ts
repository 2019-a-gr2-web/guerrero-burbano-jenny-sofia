import { Controller, Get, Response } from '@nestjs/common';
import { AppService } from './app.service';
import {PlatoService} from '../../ProyectoIndividual/proyecto-restaurante/src/Plato/plato.service';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService, private readonly plato:PlatoService)  {}

  @Get('platos')
  inicioPlatos(@Response() res): string {
    return res.render('platos/inicioPlatos', { });
  }
}

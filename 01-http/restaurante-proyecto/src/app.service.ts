import { Injectable } from '@nestjs/common';
import {Plato} from './platos/Interfaces/plato';
import {PlatoService} from './platos/plato.service';


@Injectable()
export class AppService {
  platoSeleccionados: any[]=[]
  platosDisponibles: any[]=[]
  constructor(){

  }
  getHello(): string {
    return 'Hello World!';
  }

}

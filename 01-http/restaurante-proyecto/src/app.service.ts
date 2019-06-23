import { Injectable } from '@nestjs/common';
import {Plato} from './platos/Interfaces/plato';

@Injectable()
export class AppService {
  platoSeleccionados: Plato[]=[]
  platosDisponibles: Plato[]=[]
  getHello(): string {
    return 'Hello World!';
  }
}

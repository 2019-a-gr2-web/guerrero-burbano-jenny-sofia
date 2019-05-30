import { Injectable } from '@nestjs/common';
import {Autor} from './Autores/Interfaces/autor';

@Injectable()
export class AppService {
  nombre:string="";
  bdAutores: Autor[]=[]
  constructor(){
    const auxAutor: Autor={
      id: 2,
      nombre: 'Sofia',
      apellidos: 'Guerrero Burbano',
      ecuatoriano: true,
      fechaNacimiento: new Date(),
      numeroLibros: 34

    }
    this.bdAutores.push(auxAutor)
  }

  getHello(): string {
    return 'Hello World!';
  }
}

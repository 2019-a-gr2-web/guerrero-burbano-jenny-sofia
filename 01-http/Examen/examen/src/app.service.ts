import { Injectable } from '@nestjs/common';
import {Autor} from './Autores/Interfaces/autor';

import {Libro} from './Libros/interfaces/libro';

@Injectable()
export class AppService {
  nombre:string="";
  id: number=0
  bdAutores: Autor[]=[]
  bdLibros: Libro[]=[]
  librosSeleccionados: Libro[]= []
  constructor(){
    const auxAutor: Autor={
      id: 2,
      nombre: 'Sofia',
      apellidos: 'Guerrero Burbano',
      ecuatoriano: true,
      fechaNacimiento: new Date(),
      numeroLibros: 34

    }
    const auxLibro: Libro={
      id:1,
      ICBN:123456,
      nombre:"Las aventuras de Sofi",
      nombreEditorial:"Libritos",
      numeroPaginas:35,
      edicion: 3,
      fechaPublicacion: new Date(),
      autorId:1

    }
    const auxLibro2: Libro={
      id:0,
      ICBN:123456,
      nombre:"Las aventuras de Micky",
      nombreEditorial:"Libritos2",
      numeroPaginas:35,
      edicion: 3,
      fechaPublicacion: new Date(),
      autorId:2

    }
    this.bdAutores.push(auxAutor)
    this.bdLibros.push(auxLibro)
    this.bdLibros.push(auxLibro2)
  }

  getHello(): string {
    return 'Hello World!';
  }
}

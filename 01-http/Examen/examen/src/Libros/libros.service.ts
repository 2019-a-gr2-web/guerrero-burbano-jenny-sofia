import {Injectable} from '@nestjs/common';
import {AppService} from '../app.service';
import {Autor} from '../Autores/Interfaces/autor';
import {Libro} from './interfaces/libro';

@Injectable()
export class LibrosService {
    idnum:number=2;
    constructor(private readonly appService: AppService){

    }
    crear(nuevoLibro: Libro){
        nuevoLibro.id=this.idnum


        this.appService.bdLibros.push(nuevoLibro)
        this.idnum++
    }
    encontrar(nombreTmp){
        console.log(nombreTmp.toString())
        const arreglo= this.appService.bdLibros.filter(
            value => {
                return value.nombre.toUpperCase().includes(nombreTmp.toString().toUpperCase())
            }

        )
        return arreglo
    }
    eliminar(id:number){
        const index=this.appService.bdLibros.findIndex(
            value => {
                return value.id==id
            }
        )
        this.appService.bdLibros.splice(index,1)
    }


}
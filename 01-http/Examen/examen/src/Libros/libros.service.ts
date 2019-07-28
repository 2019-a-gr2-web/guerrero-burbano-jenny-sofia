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
    encontrar(nombreTmp, id){
        // console.log(nombreTmp.toString())
        // const arreglo= this.appService.bdLibros.filter(
        //     value => {
        //         return value.nombre.toUpperCase().includes(nombreTmp.toString().toUpperCase()) && value.autorId==id
        //     }
        //
        // )
        // return arreglo
    }
    bucar(parametrosBusqueda?){
        // var lisa
        //
        //     if (parametrosBusqueda) {
        //         var x=this.appService.listaCombos.filter(
        //             value => {
        //
        //                 return value.nombre.toUpperCase().includes(parametrosBusqueda.toString().toUpperCase())
        //
        //             }
        //         )
        //
        //         console.log("lista", x)
        //         console.log("lista2", this.appService.listaPlatos)
        //         return x
        //     } else {
        //         return this._combosRepository.find()
        //     }


    }
    eliminar(id:number){
        const index=this.appService.bdLibros.findIndex(
            value => {
                return value.id==id
            }


        )
        this.appService.bdLibros.splice(index,1)
        return this.appService.bdLibros.filter(
            value => {
                return
            }
        )
    }


}
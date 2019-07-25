import {Injectable} from '@nestjs/common';
import {AppService} from '../app.service';
import {Autor} from './Interfaces/autor';

@Injectable()
export class AutoresService {
    idnum:number=3;
    constructor(private readonly appService: AppService){

    }
    crear(nuevoAutor: Autor){
        nuevoAutor.id=this.idnum

        this.appService.bdAutores.push(nuevoAutor)
        this.idnum++
    }
    autenticar(user: String, password: String){

    }
    encontrar(nombreTmp){
        console.log(nombreTmp.toString())
        const arreglo= this.appService.bdAutores.filter(
            value => {
                return value.nombre.toUpperCase().includes(nombreTmp.toString().toUpperCase())
            }

        )
        return arreglo
    }
}
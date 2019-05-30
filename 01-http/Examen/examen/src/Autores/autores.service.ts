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
}
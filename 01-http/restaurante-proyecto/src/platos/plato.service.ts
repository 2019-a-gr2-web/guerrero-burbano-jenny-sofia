import {Injectable} from '@nestjs/common';


import {InjectRepository} from "@nestjs/typeorm";
import {PlatoEntity} from './plato.entity';
import {Repository, UpdateResult} from 'typeorm';
import {Trago} from '../../../02-servidor-web-nodejs/api-web/src/tragos/Interfaces/trago';
import {TragosEntity} from '../../../02-servidor-web-nodejs/api-web/src/tragos/tragos.entity';
import {Plato} from './Interfaces/plato';

@Injectable()
export class PlatoService {
    constructor(@InjectRepository(PlatoEntity)
                private readonly _platosRepository: Repository<PlatoEntity>,) {


    }
    buscar(parametrosBusqueda?):Promise<any>{
        return this._platosRepository.find(parametrosBusqueda)
    }
    crear(nuevoPlato: Plato): Promise<PlatoEntity> {
        const objetoEntidad= this._platosRepository.create(nuevoPlato);



        return this._platosRepository.save(objetoEntidad)
        // nuevoTrago.id = this.recnum;
        // this.recnum++;
        // this.bddTragos.push(nuevoTrago);
        // return nuevoTrago;
    }
    editar(platoEditar: Plato): Promise<UpdateResult>{
        return this._platosRepository.update(platoEditar.id, platoEditar)
    }
    crearPrueba(){

    }
}
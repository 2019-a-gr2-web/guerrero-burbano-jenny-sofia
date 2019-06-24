import {Injectable} from '@nestjs/common';


import {InjectRepository} from "@nestjs/typeorm";
import {PlatoEntity} from './plato.entity';
import {Repository, UpdateResult} from 'typeorm';
import {Trago} from '../../../02-servidor-web-nodejs/api-web/src/tragos/Interfaces/trago';
import {TragosEntity} from '../../../02-servidor-web-nodejs/api-web/src/tragos/tragos.entity';
import {Plato} from './Interfaces/plato';
import any = jasmine.any;
import {error} from 'util';

@Injectable()
export class PlatoService {
    query:string
    constructor(@InjectRepository(PlatoEntity)
                private readonly _platosRepository: Repository<PlatoEntity>,) {


    }
    buscar(parametrosBusqueda?):Promise<any>{
        return this._platosRepository.find(parametrosBusqueda)
    }
    platosSeleccionados(idCombo:string){
       this.query ="select  platoId as id, nombre_plato as nombre, descripcion_plato as descripcion, precio as precio from bd_plato, bd_relacion where bd_relacion.platoId=bd_plato.id and bd_relacion.comboId="+idCombo
        this._platosRepository.query(this.query).then(
            value => {
                console.log('RESULTADO DE MI QUERY', value)
            },
            error=>{
                console.log(error)
            }
        )
        return this._platosRepository.query(this.query)


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
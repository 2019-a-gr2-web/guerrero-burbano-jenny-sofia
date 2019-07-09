import {Injectable} from '@nestjs/common';
import {Trago} from './Interfaces/trago';
import {getConnection, Repository, UpdateResult} from 'typeorm';
import {InjectRepository} from "@nestjs/typeorm";
import {TragosEntity} from "./tragos.entity";

import {RelacionEntity} from '../../../../restaurante-proyecto/src/combos/relacion.entity';
import {ComboEntity} from '../../../../restaurante-proyecto/src/combos/combo.entity';
import {Combo} from '../../../../restaurante-proyecto/src/combos/Interfaces/combo';

@Injectable()
export class TragosService {
    bddTragos: Trago[] = [];
    recnum = 1;
    constructor(@InjectRepository(TragosEntity)
                private readonly _tragosRepository: Repository<TragosEntity>,) {


    }
    buscar(parametrosBusqueda?):Promise<any>{
        return this._tragosRepository.find(parametrosBusqueda)
    }
    // @ts-ignore
    crear(nuevoTrago: Trago): Promise<TragosEntity> {
        const objetoEntidad= this._tragosRepository.create(nuevoTrago);



        return this._tragosRepository.save(objetoEntidad)

        // nuevoTrago.id = this.recnum;
        // this.recnum++;
        // this.bddTragos.push(nuevoTrago);
        // return nuevoTrago;
    }
    crearPrueba(){

    }
    async eliminar(id: number){

        // recien obtengo el indice
        try {


            await getConnection().createQueryBuilder().delete().from(TragosEntity)
                .where("id = :id", {id: id})
                .execute()
            console.log('eliminadosss', id)
        } catch (e) {
            console.log(e)
        }
    }
    editar(tragoEditar: Trago): Promise<UpdateResult> {
        return this._tragosRepository.update(tragoEditar.id, tragoEditar)
    }

    buscarPorId(id: number) {
        this.bddTragos.find(
            (trago) => {
                return trago.id === id;
            },
        );
    }

    modificar(id: number): Trago[] {
        const indice = this.bddTragos.findIndex(
            (trago) => {
                return trago.id === id;
            },
        );
        this.bddTragos.splice(indice, 1);
        return this.bddTragos;
    }

    actualizar(tragoActualizado: Trago, id: number): Trago[] {
        const indice = this.bddTragos.findIndex(
            (trago) => {
                return trago.id === id;
            },
        );
        tragoActualizado.id = this.bddTragos[indice].id;
        this.bddTragos[indice] = tragoActualizado;
        return this.bddTragos;
    }
    buscarPorNombre(nombre: string) {
        this.bddTragos.find(
            (trago) => {
                return trago.nombre.toUpperCase().includes(nombre.toUpperCase()) ;
            },
        );
    }

}

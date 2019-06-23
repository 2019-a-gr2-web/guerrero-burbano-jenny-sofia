import {Injectable} from '@nestjs/common';
import {Trago} from './Interfaces/trago';

import {InjectRepository} from "@nestjs/typeorm";
import {TragosEntity} from "./tragos.entity";
import {Repository} from "typeorm";

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
    eliminar(id: number): Trago[] {

        // recien obtengo el indice
        const indice = this.bddTragos.findIndex(
            (trago) => {
                return trago.id === id;
            },
        );

        return this.bddTragos.splice(indice, 1); // parametros(indice que quiero empezar, cuantos eliminar)
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

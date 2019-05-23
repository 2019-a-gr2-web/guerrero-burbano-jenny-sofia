import {Injectable} from '@nestjs/common';
import {Trago} from './Interfaces/trago';

@Injectable()
export class TragosService {
    bddTragos: Trago[] = [];
    recnum = 1;
    constructor() {
        const traguito: Trago = {
            nombre: 'Pilsener',
            gradosAlcohol: 4.3,
            fechaCaducidad: new Date(2018, 5, 10),
            precio: 1.75,
            tipo: 'Cerveza',

        };
        this.crear(traguito);
    }
    // @ts-ignore
    crear(nuevoTrago: Trago): Trago {
        nuevoTrago.id = this.recnum;
        this.recnum++;
        this.bddTragos.push(nuevoTrago);
        return nuevoTrago;
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

import {Injectable} from '@nestjs/common';
import {Autor} from './Interfaces/autor';

@Injectable()
export class PlatoService {
    bdPlato: Autor[]=[]
    numInicial=1
    constructor(){

        const plato:Autor={
            nombre: 'Shawarema',
            precio: 14.5
        }
        this.agregar(plato)
    }
    eliminar(id:number){
        const index=this.bdPlato.findIndex(
            value => {
                return value.id===id
            }
        )
        return this.bdPlato.splice(index, 1)

    }
    agregar(plato:Autor){

        plato.id=this.numInicial
        this.bdPlato.push(plato)
        this.numInicial++;

        return this.bdPlato

    }
    buscarPorIndice(nombre:String){
        return this.bdPlato.filter(
            (value) => {
                return value.nombre.toUpperCase().includes(nombre.toUpperCase())
            }
        )
    }



}
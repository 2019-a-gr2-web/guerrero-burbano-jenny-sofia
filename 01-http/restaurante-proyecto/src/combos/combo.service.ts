import {Injectable} from '@nestjs/common';
import {PlatoEntity} from '../platos/plato.entity';
import {Repository, UpdateResult} from 'typeorm';
import {Plato} from '../platos/Interfaces/plato';
import {InjectRepository} from "@nestjs/typeorm";
import {ComboEntity} from './combo.entity';
import {Combo} from './Interfaces/combo';
import {Relacion} from './Interfaces/relacion'
import {RelacionEntity} from './relacion.entity';
import {Libro} from '../../../Examen/examen/src/Libros/interfaces/libro';

@Injectable()
export class ComboService {
    platoSeleccionados: Plato[]=[]
    platosDisponibles: Plato[]=[]
    constructor(@InjectRepository(ComboEntity)
                private readonly _combosRepository: Repository<ComboEntity>,
                @InjectRepository(RelacionEntity)
                private readonly  _relacionRepository: Repository<RelacionEntity>,
               ) {



    }
   // buscarPlatos(parametrosBusqueda?):Promise<any>{
    //   return this._platosRepository.find(parametrosBusqueda)
    //}
    buscar(parametrosBusqueda?):Promise<any>{
        return this._combosRepository.find(parametrosBusqueda)
    }
    crear(nuevoCombo: Combo): Promise<ComboEntity> {
        const objetoEntidad= this._combosRepository.create(nuevoCombo);
        const relacion:Relacion={

           combo:1,
            plato:1
        };


        const objeto= this._relacionRepository.create(relacion)
        this._relacionRepository.save(objeto).then(
            value => {
                console.log('todo bien', value)
            },
            onerror=>{
                console.log('error', onerror)
            }
        )


        return this._combosRepository.save(objetoEntidad)

        // nuevoTrago.id = this.recnum;
        // this.recnum++;
        // this.bddTragos.push(nuevoTrago);
        // return nuevoTrago;
    }
    crearRelacion(){

    }
    editar(comboEditar: Combo): Promise<UpdateResult>{
        return this._combosRepository.update(comboEditar.id, comboEditar)
    }
    crearPrueba(){

    }
}
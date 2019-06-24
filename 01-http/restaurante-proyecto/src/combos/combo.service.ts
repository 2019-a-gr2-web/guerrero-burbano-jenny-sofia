import {Injectable} from '@nestjs/common';
import {PlatoEntity} from '../platos/plato.entity';
import {getConnection, Repository, UpdateResult} from 'typeorm';
import {Plato} from '../platos/Interfaces/plato';
import {InjectRepository} from "@nestjs/typeorm";
import {ComboEntity} from './combo.entity';
import {Combo} from './Interfaces/combo';
import {Relacion} from './Interfaces/relacion'
import {RelacionEntity} from './relacion.entity';
import {Libro} from '../../../Examen/examen/src/Libros/interfaces/libro';

@Injectable()
export class ComboService {

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



        return this._combosRepository.save(objetoEntidad)

        // nuevoTrago.id = this.recnum;
        // this.recnum++;
        // this.bddTragos.push(nuevoTrago);
        // return nuevoTrago;
    }
    async eliminar(comboid){
        console.log('----------------------', comboid)
        try {

        await getConnection().createQueryBuilder().delete().from(RelacionEntity)
            .where("comboId = :comboId", {comboId: comboid})
            .execute()
        await getConnection().createQueryBuilder().delete().from(ComboEntity)
            .where("id = :id", {id: comboid})
            .execute()
        }catch (e) {
            console.log(e)
        }

    }
    crearRelacion(idPlato:number, idCombo: number){
        const relacion:Relacion={

            combo:idCombo,
            plato:idPlato
        };


        const objeto= this._relacionRepository.create(relacion)
        return this._relacionRepository.save(objeto).then(
            value => {
                console.log('todo bien', value)
            },
            onerror=>{
                console.log('error', onerror)
            }
        )
    }
    editar(comboEditar: Combo): Promise<UpdateResult>{
        return this._combosRepository.update(comboEditar.id, comboEditar)
    }
    crearPrueba(){

    }
}
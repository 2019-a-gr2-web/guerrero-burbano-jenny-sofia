import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import {PlatoEntity} from '../platos/plato.entity';
import {ComboEntity} from './combo.entity';


@Entity('bd_relacion') //Podemos pasr el nombre de la tabla
export class RelacionEntity {

    @PrimaryGeneratedColumn()
    id:number;


    @ManyToOne(type => PlatoEntity, plato=>plato.relacion)
    plato: number
    @ManyToOne(type => ComboEntity, combo=>combo.relacion)
    combo: number

}
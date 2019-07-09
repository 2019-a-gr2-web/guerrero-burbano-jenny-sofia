import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import {RelacionEntity} from '../combos/relacion.entity';


@Entity('bd_plato') //Podemos pasr el nombre de la tabla
export class PlatoEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        type: 'varchar',
        length: 70,
        name: 'nombre_plato',
    })
    nombre: string;

    @Column({
        type: 'varchar',
        length: 300,
        name: 'descripcion_plato',
    })
    descripcion: string



    @Column({
        type: 'decimal',
        precision: 10,
        scale:2,
        name: 'precio',
    })
    precio: number;

    @OneToMany( type => RelacionEntity, relacion => relacion)
    relacion: RelacionEntity[]

}
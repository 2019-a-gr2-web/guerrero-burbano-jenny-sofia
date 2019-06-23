import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import {RelacionEntity} from './relacion.entity';


@Entity('bd_combo') //Podemos pasr el nombre de la tabla
export class ComboEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        type: 'varchar',
        length: 70,
        name: 'nombre_combo',
    })
    nombre: string;

    @Column({
        type: 'varchar',
        length: 200,
        name: 'descripcion_combo',
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
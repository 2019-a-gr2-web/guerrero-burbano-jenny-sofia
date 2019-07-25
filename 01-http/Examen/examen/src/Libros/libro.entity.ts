import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import {AutorEntity} from '../Autores/autor.entity';



@Entity('bd_libro') //Podemos pasr el nombre de la tabla
export class LibroEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        type: 'varchar',
        length: 70,
        name: 'nombre_libro',
    })
    nombre: string;
    @Column({
        type: 'int',
        name: 'ICBN',
    })
    ICBN: number;

    @Column({
        type: 'int',
        name: 'numeroPaginas',
    })
    numeroPaginas: string
    @Column({
        type: 'int',
        name: 'edicion',
    })
    edicion: string
    @Column({
        type: 'date',
        name: 'fechaPublicacion',
    })
    fechaPublicacion: string


    @Column({
        type: 'date',
        name: 'fechaNacimiento',
    })
    fechaNacimiento: Date;


    @Column({
        type: 'varchar',
        name: 'nombreEditorial',
    })
    nombreEditorial: boolean;

    @ManyToOne(type => AutorEntity, autor=>autor.libro)
    autor: number

}
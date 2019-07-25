import {Injectable} from "@nestjs/common";
import {PedidoEntity} from "./pedido.entity";
import {getConnection, getRepository, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Pedido} from './interfaces/pedido';
import {AutorEntity} from '../Autores/autor.entity';
import {LibroEntity} from '../Libros/libro.entity';
import {AutorLibro} from './interfaces/autorLibro';
import {Libro} from '../Libros/interfaces/libro';

@Injectable()
export class PedidoService {

    constructor(@InjectRepository(PedidoEntity)
                private readonly _pedidosRepository: Repository<PedidoEntity>,@InjectRepository(AutorEntity)
    private readonly _autorRepository: Repository<AutorEntity>, @InjectRepository(LibroEntity)
    private readonly _libroRepository: Repository<LibroEntity>) {
    }
    crearPedido(): Promise<PedidoEntity>{

        const pedido = {} as Pedido;
        pedido.nombreUsuario=""
        pedido.ciUsuario=""
        pedido.direccionUsuario=""
        pedido.estadoPedido="Iniciado"
        pedido.telefonoUsuario=""
        pedido.totalConImpuesto=12.45
        pedido.totalSinImpuesto=14.2
        const objetoEntidad= this._pedidosRepository.create(pedido);
        return this._pedidosRepository.save(objetoEntidad)
    }
    getAutores(){
        return this._pedidosRepository.find()

    }
    getLibros(){
        return this._libroRepository.find()

    }
    async cargarMateriasAutores(){
        const listaAutores= await this._autorRepository.find();
        let autores=new Array<AutorLibro>();
        let autorDinamico= {} as AutorLibro
        var cont= 0
        await listaAutores.forEach(
            async value => {
                console.log("llegue")
                //const listalibros=await getRepository(LibroEntity).createQueryBuilder("libro").where("libro.autorId = :id", { id: 1 }).stream()
                const listalibros: Libro[]=await this._libroRepository.query("SELECT * FROM db_examen.bd_libro where db_examen.bd_libro.autorId="+value.id+";")
               console.log("MIS LIBROS", listalibros)
                autorDinamico.apellidos=value.apellidos
                autorDinamico.ecuatoriano=value.ecuatoriano
                autorDinamico.fechaNacimiento=value.fechaNacimiento
                autorDinamico.id=value.id
                autorDinamico.nombre=value.nombres
                autorDinamico.numeroLibros=value.numeroLibros
                autorDinamico.libros= new Array<Libro>();
                var listaLibros= Array<Libro>();
                console.log("mi autor dinamico", autorDinamico)
                debugger
                listalibros.forEach(
                     libro => {

                        autorDinamico.libros.push(libro)
                         console.log("holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", autorDinamico.libros)
                         console.log("AUTOREEEEEEEEEEEEEEEEEEEEEEEEES", autorDinamico)
                    }
                )
                console.log("QUI DEBERIA ESTAR DESPUES", autores)

                autores.push(autorDinamico)
                console.log("QUI DEBERIA ESTAR DESPUES 2", autores)
                cont++
                console.log("CONT", cont)
                console.log("LENG", listaAutores.length)

                if(cont==listaAutores.length){
                    console.log("FIIIIIIIIIIIIN", autores[0].libros[0].nombre)
                    return autores
                }

            }
        )




    }
    editar(pedidoEditar: Pedido){
        return this._pedidosRepository.update(pedidoEditar.ipPedido, pedidoEditar)
    }

    buscarUsuario(parametrosBusqueda?):Promise<PedidoEntity[]>{
        return this._pedidosRepository.find(parametrosBusqueda);
    }


}
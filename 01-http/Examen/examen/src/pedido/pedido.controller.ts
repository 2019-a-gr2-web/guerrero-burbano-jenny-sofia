import {Body, Controller, Get, Param, Post, Query, Res, Session} from "@nestjs/common";
import {Pedido} from "./interfaces/pedido";
import {PedidoService} from "./pedido.service";
import {PedidoCreateDto} from './DTO/pedido.create.dto';
import {PedidoUpdateDto} from './DTO/pedido.update.dto';
import {validate} from 'class-validator';
import {connectableObservableDescriptor} from 'rxjs/internal/observable/ConnectableObservable';
import {Libro} from '../Libros/interfaces/libro';
import {LibroAux} from './interfaces/libroAux';
import {LibroEntity} from '../Libros/libro.entity';
import {getConnection} from 'typeorm';
import {PedidoEntity} from './pedido.entity';


@Controller('/api/pedido')
export class PedidoController {

    constructor(private readonly _pedidoService:PedidoService){
    }

    @Get('realizarPedidos/:idPedido/:idAutor/:total')
    async cargarPedidos(@Res() res, @Param() params){
        const pedidoNuevo=await this._pedidoService.getPedidoEspecifico(params.idPedido)
        this._pedidoService.idAutorSeleccionado=params.idAutor
       
        var listaLibros= await this._pedidoService.getLibros(params.idAutor)
        var librosSeleccionados= this._pedidoService.librosSeleccionados
        var total=params.total

       
        const listaAutores= await  this._pedidoService.getAutores()
        console.log("mi lista autores", listaAutores)
        return res.render('cliente/pedido',{pedidoNuevo, listaLibros, listaAutores, librosSeleccionados,total})
    }
    @Get('crearPedido')
    async crearPedido(@Res() res){
        this._pedidoService.librosSeleccionados=[]
        const pedidoNuevo=await this._pedidoService.crearPedido()
        return res.redirect('/api/pedido/realizarPedidos/'+pedidoNuevo.ipPedido+'/-1/'+0)
    }
    @Post('addPedido')
    async addPedido(@Res() res, @Body() body){
        console.log("MI BODY", body)
        const libro:LibroEntity=await this._pedidoService.getLibroEspecifico(body.id)
        var libroAux:LibroAux= {} as LibroAux
        var existe= this._pedidoService.librosSeleccionados.some(
            value => value.id==body.id
        )
        if(!existe){
            libroAux.nombre=libro.nombre
            libroAux.precio=libro.precio
            libroAux.id= libro.id
            libroAux.cantidad=0
            this._pedidoService.librosSeleccionados.push(libroAux)
            var total=0
            this._pedidoService.librosSeleccionados.forEach(
                value => {
                    total=total+(value.precio*value.cantidad)
                }
            )
            console.log("totaaaaaaaaaaaaaaal", total)

            res.redirect('/api/pedido/realizarPedidos/'+body.idPedido+'/'+ this._pedidoService.idAutorSeleccionado+'/'+ total)

        }else{
            console.log("EXISTE")
            var indexLibroSeleccionado=this._pedidoService.librosSeleccionados.findIndex(
                value => value.id==body.id
            )
            this._pedidoService.librosSeleccionados[indexLibroSeleccionado].cantidad++
            var total2=0
            this._pedidoService.librosSeleccionados.forEach(
                value => {
                    total2=total2+(value.precio*value.cantidad)
                }
            )
            console.log("totaaaaaaaaaaaaaaal", total2)

            res.redirect('/api/pedido/realizarPedidos/'+body.idPedido+'/'+ this._pedidoService.idAutorSeleccionado+'/'+total2)

        }





    }
    @Get('cargarDespachador')
    async mostrarDespachador(@Res() res){
        var pedidos= await this._pedidoService.getPedido()
        pedidos= pedidos.filter(
            value => {
                return value.estadoPedido=="Por despachar"
            }
        )

        res.render('cliente/despachador', {pedidos})
    }
    @Post('despachar/:idPedido')
    async despachar(@Res() res, @Param() params){
        var pedidoDespachar= await this._pedidoService.despachar(params.idPedido)
        res.redirect('/api/pedido/cargarDespachador')
    }
    @Post('editar')
    async editar(@Res() res, @Body() pedido:Pedido){
        console.log("ESTE ES MI PEDIDO",pedido)

        let pedidoAValidar= new PedidoUpdateDto()
        pedidoAValidar.nombreUsuario=pedido.nombreUsuario
        pedidoAValidar.ipPedido= pedido.ipPedido
        try {
            const errores= await validate(pedidoAValidar)
            console.log("Errores", errores)
            pedido.estadoPedido="Por despachar"
            const respuestaCrear = await this._pedidoService.editar(pedido)
            res.redirect('/api/usuario/menu_cliente')

        }catch (e) {
            console.log("ERRORDEF", e)
            res.redirect('/api/usuario/menu_cliente');

        }

    }
    @Get('prueba')
     async get(@Res() res) {
        const pedido = {} as Pedido;
        pedido.nombreUsuario=""
        pedido.ciUsuario=""
        pedido.direccionUsuario=""
        pedido.estadoPedido="Iniciado"
        pedido.telefonoUsuario=""
        pedido.totalConImpuesto=12.45
        pedido.totalSinImpuesto=14.2
        // const result= await this._pedidoService.crearPedido(pedido)
        // console.log("PEDIDO CREADO",result)
        // res.render('cliente/pedido')

    }
}
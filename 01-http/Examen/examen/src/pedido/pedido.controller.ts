import {Body, Controller, Get, Param, Post, Query, Res, Session} from "@nestjs/common";
import {Pedido} from "./interfaces/pedido";
import {PedidoService} from "./pedido.service";
import {PedidoCreateDto} from './DTO/pedido.create.dto';
import {PedidoUpdateDto} from './DTO/pedido.update.dto';
import {validate} from 'class-validator';


@Controller('/api/pedido')
export class PedidoController {

    constructor(private readonly _pedidoService:PedidoService){

    }

    @Post('editar')
    async editar(@Res() res, @Body() pedido:Pedido){
        let pedidoAValidar= new PedidoUpdateDto()
        pedidoAValidar.nombreUsuario=pedido.nombreUsuario
        pedidoAValidar.ipPedido= pedido.ipPedido
        try {
            const errores= await validate(pedidoAValidar)
            console.log("Errores", errores)
        }catch (e) {
            const respuestaCrear = await this._pedidoService.editar(pedido)
            console.log('Respuesta!!!!', respuestaCrear)

            res.redirect('/api/pedido/lista');

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
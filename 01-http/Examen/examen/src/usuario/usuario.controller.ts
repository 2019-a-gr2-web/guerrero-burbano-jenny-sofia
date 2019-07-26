import {Body, Controller, Get, Param, Post, Query, Res, Session} from "@nestjs/common";
import {Usuario} from "./interfaces/usuario";
import {UsuarioService} from "./usuario.service";
import {PedidoService} from '../pedido/pedido.service';

    @Controller('/api/usuario')
export class UsuarioController {

    constructor(private readonly _UsuarioService:UsuarioService, private readonly _pedidoService:PedidoService){

    }
    @Post('autenticando')
    async postAutenticar(@Body() body,
                         @Session() session, @Res() res) {
        console.log(body);
        const usuario: Usuario = {nombreUsuario: body.nombre, passUsuario: body.contrasenia};
        console.log(usuario);
        const respuestaUsuario = await this._UsuarioService
            .buscarUsuario(usuario);
        const valor:Usuario=respuestaUsuario.find(
            value => value.nombreUsuario==usuario.nombreUsuario
        )
        if(respuestaUsuario.length>0){
            console.log(respuestaUsuario)
            session.username = usuario.nombreUsuario;
            session.password = usuario.passUsuario;
            if(valor.tipoUsuario=="Admin"){
                const tempNombre= valor.nombreUsuario
                console.log("aDMINISTRADOR!!!!!!!")
                return res.render('menu/menu', {tempNombre})
            }else if(valor.tipoUsuario=="Despachador"){

                console.log("  DESPACHADOR")
                res.redirect('/api/pedido/cargarDespachador')

            }else{
                console.log("  CLIENTE")
                this._pedidoService.librosSeleccionados=[]
                const pedidoNuevo=await this._pedidoService.crearPedido()

               // const pedido=
                return res.redirect('/api/pedido/realizarPedidos/'+pedidoNuevo.ipPedido+'/-1/'+0)
            }


        }else{

        }




    }
        @Get('prueba')
        get(@Res() res) {

            console.log("jajaja")
            res.render('cliente/prueba')

        }
}
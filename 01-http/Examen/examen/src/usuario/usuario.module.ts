import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {UsuarioController} from "./usuario.controller";
import {UsuarioService} from "./usuario.service";
import {PedidoModule} from '../pedido/pedido.module';
import {PedidoEntity} from '../pedido/pedido.entity';

@Module({
    imports:[
        TypeOrmModule.forFeature(
            [
                UsuarioEntity
            ],
            'default'
        ), PedidoModule
    ],
    controllers:[UsuarioController],
    providers:[UsuarioService],
    exports:[]
})
export class UsuarioModule {

}
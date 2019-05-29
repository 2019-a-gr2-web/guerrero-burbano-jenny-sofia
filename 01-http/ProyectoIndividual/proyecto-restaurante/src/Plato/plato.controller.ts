import {Body, Controller, Get, Post, Res} from '@nestjs/common';
import {PlatoService} from './plato.service';
import {Autor} from './Interfaces/autor';

@Controller('api/platos')
export class PlatoController {
    constructor(private readonly service_platos: PlatoService){

    }
    @Get('listaPlatos')
    listaPlatos(@Res() res){
        const arregloPlatos=this.service_platos.bdPlato

         res.render('platos/lista', {arregloPlatos})
    }
    @Get('crear')
    crear(@Res() res){
        res.render('platos/crear-editar')
    }
    @Post('eliminar')
    eliminarPlato(@Res() res, @Body('id') id: number){
        this.service_platos.eliminar(id)
        const arregloPlatos=this.service_platos.bdPlato
        res.render('platos/lista', {arregloPlatos})

    }
    @Post('agregar')
    agregarPlatos(@Res() res, @Body() body:Autor){
        this.service_platos.agregar(body)
        const arregloPlatos=this.service_platos.bdPlato
        res.render('platos/lista', {arregloPlatos})

    }




}
import {Body, Controller, Get, Post, Res, Response} from '@nestjs/common';
import {TragosService} from './tragos.service';
import {Trago} from './Interfaces/trago';

@Controller('/api/traguito')
export class TragosController {
    constructor(private readonly _tragosService: TragosService) {

    }
    @Get('lista')
    listarTragos(@Response() res) {
        const arregloTragos = this._tragosService.bddTragos;
        res.render('tragos/lista-tragos', { arregloTragos} );
    }
    @Get('crear')
    crear(@Response() res) {
        const arregloTragos = this._tragosService.bddTragos;
        res.render('tragos/crear-editar');
    }
    @Get('eliminar')
    eliminar( @Body('id') id: number,
              @Res() res,

    ) {

        this._tragosService.eliminar(id);
        res.redirect('/api/traguito/lista');

    }

       // res.render('tragos/crear-editar');

    @Post('crear')
    crearTragoPost(
        @Body() trago: Trago,
        @Body('nombre') nombre: string,
        @Body('tipo') tipo: string,
        @Body('gradosAlcohol') gradosAlcohol: number,
        @Body('fechaCaducidad') fechaCaducidad: Date,
        @Body('precio') precio: number,
        @Res() res,
    ) {
        trago.gradosAlcohol = Number(trago.gradosAlcohol);
        trago.precio = Number(trago.precio);
        trago.fechaCaducidad = new Date(trago.fechaCaducidad);
        console.log(trago);
        console.log('Trago: ', trago, typeof trago);
        console.log('Nombre: ', nombre, typeof nombre);
        console.log('Tipo: ', tipo, typeof tipo);
        console.log('GradosAlcohol: ', gradosAlcohol, typeof gradosAlcohol);
        console.log('FechaCaducidad: ', fechaCaducidad, typeof fechaCaducidad);
        console.log('Precio: ', precio, typeof precio);
        this._tragosService.crear(trago);
        res.redirect('/api/traguito/lista');

    }
}

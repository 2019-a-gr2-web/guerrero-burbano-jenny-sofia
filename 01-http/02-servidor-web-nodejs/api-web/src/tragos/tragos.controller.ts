import {Body, Controller, Get, Post, Query, Res, Response} from '@nestjs/common';
import {TragosService} from './tragos.service';
import {Trago} from './Interfaces/trago';
import {TragosCreateDto} from './DTO/tragos.create.dto';
import {validate} from 'class-validator';
import {Combo} from '../../../../restaurante-proyecto/src/combos/Interfaces/combo';
import {ComboUpdateDto} from '../../../../restaurante-proyecto/src/combos/DTO/combo.update.dto';
import {TragosUpdateDto} from './DTO/tragos.update.dto';

@Controller('/api/traguito')
export class TragosController {
    constructor(private readonly _tragosService: TragosService) {

    }

    @Get('lista')
    async listarTragos(@Response() res) {

        const arregloTragos = await this._tragosService.buscar()

        res.render('tragos/lista-tragos', {arregloTragos});
    }

    @Get('crear')
    crear(@Response() res, @Query('mensaje') mensaje:string) {

        res.render('tragos/crear-editar',{mensaje: mensaje});
    }


    @Post('eliminar')
    async eliminar(@Body() body,
             @Res() res,
    ) {
        console.log('holaaaa', body)

        await this._tragosService.eliminar(body.id);
        res.redirect('/api/traguito/lista');

    }
    @Post('editar')
    async editarPlato(@Res() res, @Body() trago: Trago) {
        let tragoAValidar = new TragosUpdateDto()
        tragoAValidar.nombre = trago.nombre;
        tragoAValidar.tipo = trago.tipo;
        tragoAValidar.fechaCaducidad =new Date( trago.fechaCaducidad);
        tragoAValidar.precio = Number(trago.precio);
        tragoAValidar.gradosAlcohol = Number(trago.gradosAlcohol);
        try {
            const errores = await validate(tragoAValidar)
            if (errores.length > 0) {
                console.log(errores)
                //res.redirect('/api/traguito/crear?mensaje=Tienes un error en el formulario')
            } else {
                const respuestaCrear = await this._tragosService.editar(trago)
                console.log('Respuesta--------------!!!!', respuestaCrear)

                res.redirect('/api/traguito/lista');
            }

        } catch (e) {
            console.error("ERROR CREANDO TRAGUITO", e)
            res.status(500);
            res.send({
                mensaje: 'Error',
                codigo: 500
            })
        }
    }

    // res.render('tragos/crear-editar');

    @Post('crear')
    async crearTragoPost(
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
        trago.fechaCaducidad = trago.fechaCaducidad ? new Date(trago.fechaCaducidad) : undefined;
        console.log(trago);
        console.log('Trago: ', trago, typeof trago);
        console.log('Nombre: ', nombre, typeof nombre);
        console.log('Tipo: ', tipo, typeof tipo);
        console.log('GradosAlcohol: ', gradosAlcohol, typeof gradosAlcohol);
        console.log('FechaCaducidad: ', fechaCaducidad, typeof fechaCaducidad);
        console.log('Precio: ', precio, typeof precio);
        let tragoAValidar = new TragosCreateDto()
        tragoAValidar.nombre = trago.nombre;
        tragoAValidar.tipo = trago.tipo;
        tragoAValidar.fechaCaducidad =new Date( trago.fechaCaducidad);
        tragoAValidar.precio = Number(trago.precio);
        tragoAValidar.gradosAlcohol = Number(trago.gradosAlcohol);

        try {
            const errores = await validate(tragoAValidar)
            if (errores.length > 0) {
                res.redirect('/api/traguito/crear?mensaje=Tienes un error en el formulario')
            } else {
                const respuestaCrear = await this._tragosService.crear(trago)
                console.log('Respuesta!!!!', respuestaCrear)

                res.redirect('/api/traguito/lista');
            }

        } catch (e) {
            console.error("ERROR CREANDO TRAGUITO")
            res.status(500);
            res.send({
                mensaje: 'Error',
                codigo: 500
            })
        }


    }
}

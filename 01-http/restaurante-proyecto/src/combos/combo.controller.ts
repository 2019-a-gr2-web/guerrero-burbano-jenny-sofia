import {Body, Controller, Get, Post, Res} from '@nestjs/common';


import {validate} from 'class-validator';
import {PlatoService} from '../platos/plato.service';
import {ComboService} from './combo.service';
import {Combo} from './Interfaces/combo';
import {ComboCreateDto} from './DTO/combo.create.dto';
import {ComboUpdateDto} from './DTO/combo.update.dto';
import {AppService} from '../app.service';

@Controller('/api/combo')
export class ComboController {
    constructor(private readonly _combosService: ComboService) {

    }

    @Get('lista')
    async listaCombos(@Res() res) {
        const arregloCombos = await this._combosService.buscar()
        res.render('combos/inicioCombo', {arregloCombos});
    }

    @Get('verCombo')
    async verCombo(@Res() res) {
        // const arregloPlatos = await this._combosService.buscarPlatos()
        // this._combosService.platosDisponibles=arregloPlatos
        // const arregloDisponibles= this._combosService.platosDisponibles
        // return res.render('combos/vistaCombo', {arregloDisponibles})
    }

    @Post('crear')
    async crearComboPost(
        @Body() combo: Combo,
        @Res() res,
    ) {


        let comboAValidar = new ComboCreateDto()
        comboAValidar.nombre = combo.nombre;
        comboAValidar.descripcion = combo.descripcion;
        comboAValidar.precio = Number(combo.precio);


        try {
            const errores = await validate(comboAValidar)
            if (errores.length > 0) {
                // res.redirect('/api/traguito/crear?mensaje=Tienes un error en el formulario')
            } else {
                const respuestaCrear = await this._combosService.crear(combo)
                console.log('Respuesta!!!!', respuestaCrear)

                res.redirect('/api/combos/lista');
            }

        } catch (e) {
            console.error("ERROR CREANDO combo")
            res.status(500);
            res.send({
                mensaje: 'Error',
                codigo: 500
            })
        }


    }

    @Post('editar')
    async editarPlato(@Res() res, @Body() combo: Combo) {
        let comboAValidar = new ComboUpdateDto()
        comboAValidar.nombre = combo.nombre;
        comboAValidar.descripcion = combo.descripcion;
        comboAValidar.precio = Number(combo.precio);
        try {
            const errores = await validate(comboAValidar)
            if (errores.length > 0) {
                console.log(errores)
                //res.redirect('/api/traguito/crear?mensaje=Tienes un error en el formulario')
            } else {
                const respuestaCrear = await this._combosService.editar(combo)
                console.log('Respuesta!!!!', respuestaCrear)

                res.redirect('/api/combo/lista');
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
}
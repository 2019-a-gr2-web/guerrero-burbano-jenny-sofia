import {Body, Controller, Get, Post, Res} from '@nestjs/common';


import {validate} from 'class-validator';
import {PlatoService} from '../platos/plato.service';
import {ComboService} from './combo.service';
import {Combo} from './Interfaces/combo';
import {ComboCreateDto} from './DTO/combo.create.dto';
import {ComboUpdateDto} from './DTO/combo.update.dto';
import {AppService} from '../app.service';
import {Plato} from '../platos/Interfaces/plato';

@Controller('/api/combo')
export class ComboController {
    idCombo:number
    nuevosSeleccionados: Plato[]=[]
    constructor(private readonly _combosService: ComboService, private readonly _platoService: PlatoService, private readonly _appService: AppService) {

    }

    @Get('lista')
    async listaCombos(@Res() res) {
        const arregloCombos = await this._combosService.buscar()
        res.render('combos/inicioCombo', {arregloCombos});

    }

    @Post('verCombo')
    async verCombo(@Res() res, @Body('platoId') body: number) {
        this._appService.platosDisponibles = []
        this._appService.platoSeleccionados = []

        this._appService.platoSeleccionados = await this._platoService.platosSeleccionados(body.toString())
        this.idCombo=body
        console.log('MIS PLATOS SELECCIONADOS', this._appService.platoSeleccionados)
        this._appService.platosDisponibles=await  this._platoService.buscar()
        this._appService.platosDisponibles.forEach(
             valuew=> {
                const index= this._appService.platoSeleccionados.findIndex(
                    value => {
                        console.log('ids', value.platoId, valuew.id)
                        return value.id==valuew.id
                    }
                )
                 console.log('plato:', valuew.nombre)
                 console.log('indice', index)
                 if(index!=-1){
                     this._appService.platosDisponibles.splice(index,1)
                 }
            }
        )



        const arregloDisponibles = this._appService.platosDisponibles;

        const arregloSeleccionados = this._appService.platoSeleccionados;
        // this._combosService.platosDisponibles=arre
        return res.render('combos/vistaCombo', {arregloDisponibles, arregloSeleccionados})
    }

    @Get('actualizarCombo')
    async actualizarCombo(@Res() res) {


        const arregloDisponibles = this._appService.platosDisponibles;
        const arregloSeleccionados = this._appService.platoSeleccionados;
        // this._combosService.platosDisponibles=arre
        return res.render('combos/vistaCombo', {arregloDisponibles, arregloSeleccionados})
    }
    @Post('guardarCombo')
    async guardarCombo(@Res() res){
        

    }
    @Post('addPlato')
    addElementeo(@Res() res, @Body('index') indexBody: number) {
        console.log('PLATOS INDEX', indexBody)

        const plato: Plato = this._appService.platosDisponibles[indexBody]

        this._appService.platoSeleccionados.push(plato)
        this.nuevosSeleccionados.push(plato)
        this._appService.platosDisponibles.splice(indexBody, 1)
        return res.redirect('/api/combo/actualizarCombo')
    }

    @Post('rmvPlato')
    rmvElementeo(@Res() res, @Body('index') indexBody) {
        console.log(indexBody)
        const plato: Plato = this._appService.platoSeleccionados[indexBody]
        const index= this.nuevosSeleccionados.findIndex(
            value => {
                return value.id==plato.id
            }
        )
        this.nuevosSeleccionados.splice(index,1)
        this._appService.platosDisponibles.push(plato)
        this._appService.platoSeleccionados.splice(indexBody, 1)
        return res.redirect('/api/combo/actualizarCombo')
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
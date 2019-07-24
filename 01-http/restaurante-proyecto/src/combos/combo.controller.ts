import {Body, Controller, Get, Param, Post, Res} from '@nestjs/common';


import {validate} from 'class-validator';
import {PlatoService} from '../platos/plato.service';
import {ComboService} from './combo.service';
import {Combo} from './Interfaces/combo';
import {ComboCreateDto} from './DTO/combo.create.dto';
import {ComboUpdateDto} from './DTO/combo.update.dto';
import {AppService} from '../app.service';
import {Plato} from '../platos/Interfaces/plato';
import {getConnection} from "typeorm";
import {Relacion} from './Interfaces/relacion';
import {RelacionEntity} from './relacion.entity';
import {async} from 'rxjs/internal/scheduler/async';


@Controller('/api/combo')
export class ComboController {
    idCombo: number
    nuevosSeleccionados: Plato[] = []
    nuevosDisponibles: Plato[] = []
    nombreCombo:string

    constructor(private readonly _combosService: ComboService, private readonly _platoService: PlatoService, private readonly _appService: AppService) {

    }

    @Get('lista')
    async listaCombos(@Res() res) {
        const arregloCombos = await this._combosService.buscar()

        this._appService.listaCombos = arregloCombos
        res.render('combos/inicioCombo', {arregloCombos});

    }
    @Post('buscar')
    async buscarCombos(@Res() res, @Body('nombre') nombre:string) {
        const arregloCombos = await this._combosService.buscar(nombre)
        console.log('RESULTADO BUSQUEDA', arregloCombos)
        res.render('combos/inicioCombo', {arregloCombos});

    }
    @Get('prueba/:id')
    prueba(@Res() res, @Param() params){
        const arregloDisponibles: Plato[] = this._appService.platosDisponibles;
        const arregloSeleccionados = this._appService.platoSeleccionados;
        return res.render('combos/vistaCombo', {arregloDisponibles, arregloSeleccionados})
    }
    @Get('verCombo/:id/:nombre')
    async verCombo(@Res() res, @Param() params) {
        this.nuevosSeleccionados = []
        this._appService.platosDisponibles = []
        this._appService.platoSeleccionados = []

        this._appService.platoSeleccionados = await this._platoService.platosSeleccionados(params.id.toString())//platos seleccionados en la base
        this.idCombo = params.id
        // console.log('MIS PLATOS SELECCIONADOS', this._appService.platoSeleccionados)
        this._appService.platosDisponibles = await this._platoService.buscar()
        const arregloDisponibles: Plato[] = this._appService.platosDisponibles;
        // console.log('dis',this._appService.platosDisponibles)
        // console.log('selesc',this._appService.platoSeleccionados)
        const indices: number[] = []
        this._appService.platoSeleccionados.forEach(
            valuew => {
                    const indice=arregloDisponibles.findIndex(
                        value => {
                            return value.id==valuew.id
                        }
                    )
                console.log(indice)
                arregloDisponibles.splice(indice,1)
            }
        )


        const arregloSeleccionados = this._appService.platoSeleccionados;
        this.nombreCombo=params.nombre
        const nombre= this.nombreCombo
        // this._combosService.platosDisponibles=arre
        return res.render('combos/vistaCombo', {arregloDisponibles, arregloSeleccionados,nombre })
    }

    @Get('actualizarCombo')
    async actualizarCombo(@Res() res) {


        const arregloDisponibles = this._appService.platosDisponibles;
        const arregloSeleccionados = this._appService.platoSeleccionados;
        // this._combosService.platosDisponibles=arre
        return res.render('combos/vistaCombo', {arregloDisponibles, arregloSeleccionados})
    }

    @Post('guardarCombo')
    async guardarCombo(@Res() res) {
        this.nuevosSeleccionados.forEach(
            value => {
                console.log('hola')
                const x = this._combosService.crearRelacion(value.id, this.idCombo).then(
                    value1 => {
                        console.log('creado')
                    }
                )
            }
        )


    }

    @Post('addPlato')
    addElementeo(@Res() res, @Body('index') indexBody: number) {
        const plato: Plato = this._appService.platosDisponibles[indexBody]
        const x = this._combosService.crearRelacion(plato.id, this.idCombo).then(
            value1 => {
                console.log('creado')
                res.redirect('/api/combo/verCombo/'+this.idCombo+'/'+this.nombreCombo)
            }
        )




    }
    //     console.log('PLATOS INDEX', indexBody)
    //
    //     const plato: Plato = this._appService.platosDisponibles[indexBody]
    //
    //     this._appService.platoSeleccionados.push(plato)
    //     this.nuevosSeleccionados.push(plato)
    //     this._appService.platosDisponibles.splice(indexBody, 1)
    //     return res.redirect('/api/combo/actualizarCombo')
    // }

    @Post('rmvPlato')
    async rmvElementeo(@Res() res, @Body('index') indexBody) {
        console.log(indexBody)
        const plato: Plato = this._appService.platoSeleccionados[indexBody]
        await getConnection().createQueryBuilder().delete().from(RelacionEntity).where("comboId = :comboId", {comboId: this.idCombo}).where("platoId = :platoId", {platoId: plato.id}).execute()

        res.redirect('/api/combo/verCombo/'+this.idCombo+'/'+this.nombreCombo)
    }
    @Post('eliminar')
    async eliminar(@Res() res, @Body('id') id:number ){
        await this._combosService.eliminar(id)
        res.redirect('/api/combo/lista')
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

                res.redirect('/api/combo/lista');
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
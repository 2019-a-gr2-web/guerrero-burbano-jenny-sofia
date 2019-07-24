import {Controller, Get, Res, Body, Post} from '@nestjs/common';
import {TragosService} from '../../../02-servidor-web-nodejs/api-web/src/tragos/tragos.service';
import {PlatoService} from './plato.service';
import {Trago} from '../../../02-servidor-web-nodejs/api-web/src/tragos/Interfaces/trago';
import {TragosCreateDto} from '../../../02-servidor-web-nodejs/api-web/src/tragos/DTO/tragos.create.dto';
import {Plato} from './Interfaces/plato';
import {PlatoCreateDto} from './DTO/plato.create.dto';
import {validate} from 'class-validator';
import {AppService} from '../app.service';

@Controller('/api/plato')
export class PlatoController{
    constructor(private readonly _platosService: PlatoService, private readonly appService: AppService) {

    }
    @Get('lista')
    async listaPlatos(@Res() res) {
        const arregloPlatos = await this._platosService.buscar()
        this.appService.listaPlatos=await  this._platosService.buscar()


        res.render('platos/inicioPlatos', {arregloPlatos});
    }
    @Post('buscar')
    async buscarCombos(@Res() res, @Body('nombre') nombre:string) {
        const arregloPlatos = await this._platosService.buscar(nombre)

        res.render('platos/inicioPlatos', {arregloPlatos});

    }
    @Post('crear')
    async crearTragoPost(
        @Body() plato: Plato,

        @Res() res,
    ) {


        let platoAValidar = new PlatoCreateDto()
        platoAValidar.nombre = plato.nombre;
        platoAValidar.descripcion= plato.descripcion;
        platoAValidar.precio = Number(plato.precio);


        try {
            const errores = await validate(platoAValidar)
            if (errores.length > 0) {
               // res.redirect('/api/traguito/crear?mensaje=Tienes un error en el formulario')
            } else {
                const respuestaCrear = await this._platosService.crear(plato)
                console.log('Respuesta!!!!', respuestaCrear)

                res.redirect('/api/plato/lista');
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
    @Post('eliminar')
    async eliminar(@Res() res, @Body('id') id:number ){
        await this._platosService.eliminar(id)
        res.redirect('/api/plato/lista')
    }
   @Post('editar')
    async editarPlato(@Res() res, @Body() plato:Plato){
       let platoAValidar = new PlatoCreateDto()
       platoAValidar.nombre = plato.nombre;
       platoAValidar.descripcion= plato.descripcion;
       platoAValidar.precio = Number(plato.precio);
       try {
           const errores = await validate(platoAValidar)
           if (errores.length > 0) {
               console.log(errores)
               //res.redirect('/api/traguito/crear?mensaje=Tienes un error en el formulario')
           } else {
               const respuestaCrear = await this._platosService.editar(plato)
               console.log('Respuesta!!!!', respuestaCrear)

               res.redirect('/api/plato/lista');
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
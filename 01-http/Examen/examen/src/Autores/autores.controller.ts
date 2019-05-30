import {Body, Controller, Get, Post, Req, Res} from '@nestjs/common';
import {AppService} from '../app.service';
import {AutoresService} from './autores.service';
import {Autor} from './Interfaces/autor';

@Controller('/api/autores')
export class AutoresController {
    arregloAutores: Autor[]=[]
    constructor(private readonly autoresService: AutoresService, private readonly appService: AppService) {
        this.arregloAutores=appService.bdAutores
    }
    @Get('ver')
    ver(@Res() res, @Req() req){
       const arregloAutores= this.appService.bdAutores

        const tempNombre=req.signedCookies.nombreUsuario
        return res.render('gestion/gAutor',{tempNombre, arregloAutores} )

    }
    @Post('crear')
    crear(@Res() res, @Body() autor:Autor, @Req() req){


        this.autoresService.crear(autor);
        const arregloAutores= this.appService.bdAutores
        console.log(autor)
        const tempNombre=req.signedCookies.nombreUsuario
        return res.render('gestion/gAutor',{tempNombre, arregloAutores} )

    }
    @Post('eliminar')
    eliminar(@Res() res, @Body() body, @Req() req){



        const tempNombre=req.signedCookies.nombreUsuario

        const index= this.appService.bdAutores.findIndex(
            value => {
                return value.id===body.id
            }
        );

        this.appService.bdAutores.splice(index,1)

        const arregloAutores= this.appService.bdAutores
        return res.render('gestion/gAutor',{tempNombre, arregloAutores} )

        //const arre
    }

}
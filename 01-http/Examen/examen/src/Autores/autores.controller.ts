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
        console.log("CXHAOOO", arregloAutores[0])
        const tempNombre=req.signedCookies.nombreUsuario
        return res.render('gestion/gAutor',{tempNombre, arregloAutores} )

    }
    @Post('eliminar')
    eliminar(@Res() res, @Body() body){

        console.log(body.id)
        //const arre
    }

}
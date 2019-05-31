import {Body, Controller, Get, Post, Req, Res} from '@nestjs/common';
import {AutoresService} from '../Autores/autores.service';
import {AppService} from '../app.service';
import {LibrosService} from './libros.service';
import {Autor} from '../Autores/Interfaces/autor';
import {Libro} from './interfaces/libro';

@Controller('/api/libros')
export class LibrosController {

    constructor(private readonly librosService: LibrosService, private readonly appService: AppService) {

    }
    @Get('ver')
    ver(@Res() res, @Req() req){
        const tempNombre= req.signedCookies.nombreUsuario

        const arregloTemp= this.appService.bdLibros
        console.log("ARREGLO LIBROOOOOOOS", arregloTemp)
        return res.render('gestion/gLibro', {arregloTemp, tempNombre})
    }
    @Post('eliminar')
    eliminar(@Res() res, @Req() req, @Body() body){
        const tempNombre= req.signedCookies.nombreUsuario
        this.librosService.eliminar(body.id)
        const arregloHijos= this.appService.bdLibros

        return res.render('gestion/gLibro', {arregloHijos, tempNombre})

    }
    @Post('encontrar')
    encontrar(@Res() res, @Body() body,  @Req() req){
        const tempNombre=req.signedCookies.nombreUsuario
        const arregloHijos=this.librosService.encontrar(body.nombre)
        res.render('gestion/gLibro', {arregloHijos, tempNombre})
    }
    @Post('crear')
    crear(@Res() res, @Body() libro:Libro, @Req() req){


        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", libro.autorId)
        this.librosService.crear(libro);
        const arregloHijos= this.appService.bdLibros.filter(
            value => {
                return value.autorId==libro.autorId
            }
        )

        const id=libro.autorId
        const tempNombre=req.signedCookies.nombreUsuario
        return res.render('gestion/gLibro', {arregloHijos, tempNombre, id})

    }

}
import {Body, Controller, Get, Param, Post, Req, Res} from '@nestjs/common';
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

        autor.ecuatoriano=true;
        this.autoresService.crear(autor);
        const arregloAutores= this.appService.bdAutores
        console.log(autor)
        const tempNombre=req.signedCookies.nombreUsuario
        return res.render('gestion/gAutor',{tempNombre, arregloAutores} )

    }
    @Post('encontrar')
    encontrar(@Res() res, @Body() body,  @Req() req){
        const tempNombre=req.signedCookies.nombreUsuario
        if(tempNombre){
        const arregloAutores=this.autoresService.encontrar(body.nombre)
        res.render('gestion/gAutor', {arregloAutores, tempNombre})
        }else{
            res.render('login/login')
        }
    }

    @Get('gestionHijos/:id')
    gestionHijos(@Res() res, @Param() param, @Req() req){
        const tempNombre=req.signedCookies.nombreUsuario
        if(tempNombre){
        const arregloHijos= this.appService.bdLibros.filter(
            value => {
                return value.autorId==param.id
            }
        )

        const id=param.id;
        this.appService.id=id;
        console.log(arregloHijos)
        return res.render('gestion/gLibro', {tempNombre, arregloHijos, id})
        }else{
            res.render('login/login')
        }
    }
    @Post('eliminar')
    eliminar(@Res() res, @Body() body,  @Req() req){



        const tempNombre=req.signedCookies.nombreUsuario

        const index= this.appService.bdAutores.findIndex(
            value => {
                console.log("valor", value.id, body.id)
                return value.id==body.id
            }
        );
        console.log("El indice que voy a eliminar es", index)

        this.appService.bdAutores.splice(index,1)

        const arregloAutores= this.appService.bdAutores
        return res.render('gestion/gAutor',{tempNombre, arregloAutores} )


    }

}
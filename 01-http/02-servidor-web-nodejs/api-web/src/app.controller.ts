import {Controller, Get, Post, HttpCode, Put, Delete} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/HelloWorld')
  getHello(): string {
    return 'HELLO WORLD';
  }

  //cuando se hace cambio en la logica del servidor se debe reiniciar el servidor
  //para ello se puede usar npm run start:dev

  @Post('/HolaMundo')//alt+enter para importar arriba directamente
  @HttpCode(205)
  postHolaMundo() {
    return 'Hola mundo en post';
  }
  @Put('/Bonjour_le_monde')
  bonjour(): string{
    return '\n' +
        'Bonjour le monde'
  }
  @Delete('/Ciao_mondo')
  CiaoMondo(): string{
    return '\n' +
        'Ciao_mondo'
  }


}

/*
@nombreDecoradorClase //antes de instaciar clases, metodos, atributos. Un decorador es una función, Se ejecuta antes de crearse. DECORADPR->Funcion
class clase{
  @decoradorAtributo
  public publico;
  private privado;
  protected protegido;
  constructor(@parametro()publ,priv,prot){
    this.publico=publ;
    this.privado=priv;
    this.protegido=prot;
  }
  @metodoA
  public metodopublico(){
  }
    @metodob
  private metodoprovado(){}
    @metodoC //und decorador es una función que se ejecuta antes de algo(clases,parametros,metodoso,atributos)
  protected metodoprotected(){}
}*/

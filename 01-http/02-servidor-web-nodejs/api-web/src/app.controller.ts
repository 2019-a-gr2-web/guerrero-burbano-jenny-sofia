import { Controller, Get,  Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, aP, aPri,aProt) {
    this.atributoPublico =aP;
    this.atributoProtegido=aProt;
    this.atributoPrivado= aPri;
  }
  public MetodoPublico(){

  }
  protected MetodoProtegido(){

  }
  //comentario
  private MetodoPrivado(){

  }
  @Get() //DEFFINO EL MÉTODO HTTP
  getHello2(){
    return 'HOLA MUNDO'
  }

  public atributoPublico;
  private atributoPrivado;
  protected atributoProtegido
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

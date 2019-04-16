import {Controller, Get, Post, HttpCode, Put, Delete, Headers} from '@nestjs/common';
import { AppService } from './app.service';
import {ok} from "assert";
import any = jasmine.any;

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/Hello-World')
  getHello(): string {
    var nombre= 'Sofía'
    var edad= 21
    var sueldo= 1.20;
    var casado= false
    var hijos= null
    var alas= undefined
    return 'HELLO WORLD';
  }

  //cuando se hace cambio en la logica del servidor se debe reiniciar el servidor
  //para ello se puede usar npm run start:dev

  @Post('/hola-mundo')//alt+enter para importar arriba directamente
  hola() {
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
  @Get('/adivina')
  adivina(@Headers() headers){
    console.log('Headers', headers.numero)
    const numeroRandomico=  Math.round(Math.random()*10)
    const numeroCabecera= Number(headers.numero)
    if(numeroCabecera == numeroRandomico){
      return ':)'
    }else{
      return ':(...'
    }

  }


}
const json=[
  {
    Nombre: "Sofia",
    Key : "value ",
    "edad" : any,
    "sueldo:": 10.21,
    "casado": false,
    "hijos": ["Micky ", 1,1.01, null,{
      "nombre": "Micky Guerrero"
    }]
  }
];
let objeto: any ={
  propiedad: 'valor',
  propiedadDos: 'valor2'
}
objeto.propiedad

objeto.propiedad3= 'valor3';
objeto['propiedadTres']= 'valor3';
delete objeto.propiedadTres;
objeto.propiedadTres= undefined;



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

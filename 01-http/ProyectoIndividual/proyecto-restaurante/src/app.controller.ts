import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log("hola")
    return this.appService.getHello();
  }
}

const arregloNumeros = [1, 2, 3, 4, 5, 12];
const arregloNombres=["Sofia", "Andrés", "Diego", "Kelvin", "Fabio", "Cristian", "Marquito"]
const valorInicial=1;
  // const fun= imprimir()
// function imprimir() {
//   arregloNombres.forEach(
//       (valor)=>{ //parámetro de flecha gorda
//         console.log(valor);
//       }
//   )
// }
const factoria= arregloNumeros.reduce(
    (acumulado,actual)=>{
        return acumulado*actual
    }, valorInicial
)
console.log("VOY A IMPRIMIR FACORIAL", factoria)
const arregloFiltrado =  arregloNombres.filter(
    (valor)=>{
      return valor.toUpperCase().includes('M') || valor.toUpperCase().includes('S')
    }
).forEach(
    value => {
      console.log(value)
    }
)

//a los pares sumarles 1 y a los impares sumarles 2
const arregloMap= arregloNumeros.map(
    value => {
      if(value%2==0){
        return value+1
      }else{
        return value+2
      }
    }
).forEach(
    value => {
      console.log('VAL', value)
    }
)

const valFind= arregloNombres.find(
    value => {
      return value.toUpperCase()==='SOFIA'
    }
)
console.log('NOMBRE', valFind)
const algunoMayor= arregloNumeros.some(
    value => {
      return value>10
    }
)
console.log(algunoMayor)

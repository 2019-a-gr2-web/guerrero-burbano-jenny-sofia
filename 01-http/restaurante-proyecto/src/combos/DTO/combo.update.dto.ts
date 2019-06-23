
import {IsDate, IsEmpty, IsNotEmpty, IsNumber, IsString} from 'class-validator';


export class ComboUpdateDto {

    @IsEmpty()
    id:number;

    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsString()
    descripcion: string;


    @IsNumber()
    precio:number



}
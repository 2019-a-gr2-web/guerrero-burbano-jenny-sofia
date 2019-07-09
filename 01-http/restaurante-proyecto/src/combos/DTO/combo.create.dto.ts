
import {IsDate, IsEmpty, IsNotEmpty, IsNumber, IsString} from 'class-validator';


export class ComboCreateDto {

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
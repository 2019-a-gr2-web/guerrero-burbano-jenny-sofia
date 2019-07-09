import {Module} from '@nestjs/common';
import {TragosEntity} from '../tragos/tragos.entity';
import {TragosController} from '../tragos/tragos.controller';
import {TragosService} from '../tragos/tragos.service';
import {FiestaEntity} from './fiesta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module(
    {
        imports: [
            TypeOrmModule.forFeature(
                [
                    FiestaEntity
                ],
                'default'
            ),
        ], // Módulos
        controllers: [],
        providers: [], // servicios
        exports: [], // Exportar servicios
    },
)
export class FiestaModule {

}

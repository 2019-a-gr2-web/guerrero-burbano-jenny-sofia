import {Module} from '@nestjs/common';
import {FiestaEntity} from '../fiesta/fiesta.entity';
import {TragosEntity} from '../tragos/tragos.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import {DistribuidorEntity} from './distribuidor.entity';
@Module(
    {
        imports: [
            TypeOrmModule.forFeature(
                [
                    DistribuidorEntity
                ],
                'default'
            ),
        ], // Módulos
        controllers: [],
        providers: [], // servicios
        exports: [], // Exportar servicios
    },
)
export class DistribuidorModule {

}
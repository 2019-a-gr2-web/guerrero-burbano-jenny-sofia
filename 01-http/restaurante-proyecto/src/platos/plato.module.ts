import {Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {PlatoEntity} from './plato.entity';
import {ComboEntity} from '../combos/combo.entity';
import {RelacionEntity} from '../combos/relacion.entity';
import {PlatoController} from './plato.controller';
import {PlatoService} from './plato.service';
import {ComboModule} from '../combos/combo.module';

@Module(
    {
        imports: [
            TypeOrmModule.forFeature(
                [
                    PlatoEntity
                ],
                'default'
            ),


        ], // Módulos
        controllers: [PlatoController],
        providers: [PlatoService], // servicios
        exports: [PlatoService], // Exportar servicios
    },
)
export class PlatoModule {

}

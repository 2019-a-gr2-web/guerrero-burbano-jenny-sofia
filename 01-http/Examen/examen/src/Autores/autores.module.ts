import {Module} from '@nestjs/common';
import {PlatoController} from '../../../../ProyectoIndividual/proyecto-restaurante/src/Plato/plato.controller';
import {PlatoService} from '../../../../ProyectoIndividual/proyecto-restaurante/src/Plato/plato.service';
import {AutoresController} from './autores.controller';
import {AutoresService} from './autores.service';
import {LibrosController} from '../Libros/libros.controller';
import {LibrosService} from '../Libros/libros.service';
import {AppService} from '../../../../Examen/examen/src/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ComboEntity} from '../../../../restaurante-proyecto/src/combos/combo.entity';
import {RelacionEntity} from '../../../../restaurante-proyecto/src/combos/relacion.entity';
import {AutorEntity} from './autor.entity';
import {LibrosModule} from '../Libros/libros.module';

@Module(
    {
        imports: [
            TypeOrmModule.forFeature(
                [
                    AutorEntity
                ],
                'default'
            ), LibrosModule
        ],
        controllers: [AutoresController],
        providers: [AutoresService, AppService],
        exports:[AutoresService]

    }
)
export class AutoresModule {

}

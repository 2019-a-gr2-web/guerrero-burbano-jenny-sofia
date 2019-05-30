import {Module} from '@nestjs/common';
import {PlatoController} from '../../../../ProyectoIndividual/proyecto-restaurante/src/Plato/plato.controller';
import {PlatoService} from '../../../../ProyectoIndividual/proyecto-restaurante/src/Plato/plato.service';
import {AutoresController} from './autores.controller';
import {AutoresService} from './autores.service';
import {LibrosController} from '../Libros/libros.controller';
import {LibrosService} from '../Libros/libros.service';
import {AppService} from '../../../../Examen/examen/src/app.service';

@Module(
    {
        imports: [],
        controllers: [AutoresController],
        providers: [AutoresService, AppService],
        exports:[AutoresService]

    }
)
export class AutoresModule {

}

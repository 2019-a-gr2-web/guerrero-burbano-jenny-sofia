import {Module} from '@nestjs/common';
import {PlatoController} from './plato.controller';
import {PlatoService} from './plato.service';

@Module

(
    {
        imports: [],
        controllers: [PlatoController],
        providers: [PlatoService],
        exports:[PlatoService]

    }
)
export class PlatoModule {



}
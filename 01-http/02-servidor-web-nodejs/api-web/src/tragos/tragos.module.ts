import {Module} from '@nestjs/common';
import {TragosController} from "./tragos.controller";
import {TragosService} from "./tragos.service";

@Module(
    {
        imports: [], // Módulos
        controllers: [TragosController],
        providers: [TragosService], // servicios
        exports: [TragosService], // Exportar servicios
    },
)
export class TragosModule {

}

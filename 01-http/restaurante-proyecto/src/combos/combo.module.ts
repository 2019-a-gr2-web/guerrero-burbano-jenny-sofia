import {Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ComboEntity} from './combo.entity';
import {RelacionEntity} from './relacion.entity';
import {ComboController} from './combo.controller';
import {ComboService} from './combo.service';

import {AppService} from '../app.service';
import {PlatoService} from '../platos/plato.service';
import {PlatoModule} from '../platos/plato.module';
@Module(
    {
        imports: [
            TypeOrmModule.forFeature(
                [
                    ComboEntity, RelacionEntity
                ],
                'default'
            ),PlatoModule
        ], // Módulos
        controllers: [ComboController],
        providers: [ComboService,AppService], // servicios
        exports: [ComboService], // Exportar servicios
    },
)
export class ComboModule {

}

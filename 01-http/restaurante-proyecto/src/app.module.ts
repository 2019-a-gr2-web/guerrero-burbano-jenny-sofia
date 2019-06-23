import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import {PlatoModule} from './platos/plato.module';
import {ComboModule} from './combos/combo.module';
import {ComboEntity} from './combos/combo.entity';
import {RelacionEntity} from './combos/relacion.entity';
import {PlatoEntity} from './platos/plato.entity';



@Module({
  imports: [PlatoModule, ComboModule,

    TypeOrmModule.forRoot({
      name: 'default', //Nombre por defecto del TYPEORM
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_restaurante',
      entities: [ComboEntity,RelacionEntity, PlatoEntity],
      synchronize: true,

    //  insecureAuth: true
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}



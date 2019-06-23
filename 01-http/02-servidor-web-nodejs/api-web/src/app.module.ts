import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TragosModule} from './tragos/tragos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {TragosEntity} from './tragos/tragos.entity';
import {FiestaEntity} from './fiesta/fiesta.entity';
import {FiestaModule} from './fiesta/fiesta.module';
import {DistribuidorModule} from './distribuidor/distribuidor.module';
import {DistribuidorEntity} from './distribuidor/distribuidor.entity';

@Module({
  imports: [TragosModule,FiestaModule,DistribuidorModule,

    TypeOrmModule.forRoot({
      name: 'default', //Nombre por defecto del TYPEORM
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [TragosEntity, FiestaEntity, DistribuidorEntity],
      synchronize: true,
      insecureAuth: true,

    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}



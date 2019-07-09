import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {LibrosService} from './Libros/libros.service';
import {AutoresService} from './Autores/autores.service';
import {LibrosModule} from './Libros/libros.module';
import {AutoresModule} from './Autores/autores.module';

@Module({
  imports: [LibrosModule, AutoresModule],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {

}

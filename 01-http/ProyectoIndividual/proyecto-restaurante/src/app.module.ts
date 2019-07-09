import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {PlatoModule} from './Plato/plato.module';

@Module({
  imports: [PlatoModule],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}

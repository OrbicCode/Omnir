import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarbonIntensityModule } from './carbon-intensity/carbon-intensity.module';

@Module({
  imports: [CarbonIntensityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  
}

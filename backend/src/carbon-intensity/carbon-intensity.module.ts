import { Module } from '@nestjs/common';
import { CarbonIntensityService } from './carbon-intensity.service';
import { CarbonIntensityController } from './carbon-intensity.controller';

@Module({
  controllers: [CarbonIntensityController],
  providers: [CarbonIntensityService],
})
export class CarbonIntensityModule {}

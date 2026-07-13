import { Controller, Get, Param } from '@nestjs/common';
import { CarbonIntensityService } from './carbon-intensity.service';

@Controller('carbon-intensity')
export class CarbonIntensityController {
  constructor(
    private readonly carbonIntensityService: CarbonIntensityService,
  ) {}

  @Get('test')
  async test() {
    return 'HEEELELELELEOELELEEELELELELEEOoOOOOOooOOOOOOO'
  }

  @Get('live-gen-mix')
  async getLiveGenerationMix() {
    return this.carbonIntensityService.getLiveGenerationMix();
  }

  @Get('live-intensity')
  async getLiveCarbonIntensity() {
    return this.carbonIntensityService.getLiveCarbonIntensity()
  }

  @Get('live-intensity/from-to/:from/:to')
  async getLiveIntensityFromTo(@Param('from') from: string, @Param('to') to: string) {
    return this.carbonIntensityService.getLiveIntensityFromTo(from, to)
  }

  @Get('live-intensity/regions')
  async getliveIntensityRegions() {
    return this.carbonIntensityService.getliveIntensityRegional()
  }

  @Get('live-gen-mix/postcode/:postcode')
  async getLiveGenMixByPostcode(@Param('postcode') postcode: string) {
    return this.carbonIntensityService.getLiveGenMixByPostcode(postcode)
  }

  @Get('intensity-factors')
  async getCarbonIntensityFactors() {
    return this.carbonIntensityService.getCarbonIntensityFactors()
  }
}

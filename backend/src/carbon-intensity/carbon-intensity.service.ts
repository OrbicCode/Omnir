import { Injectable, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class CarbonIntensityService implements OnModuleInit {
  private readonly palette: string[] = [
    '#dbead7',
    '#c3dcbc',
    '#abcea1',
    '#94c186',
    '#7cb36b',
    '#66a253',
    '#558745',
    '#446c37',
    '#33512a',
    '#20331a',
  ];
  private readonly regionIdMap: Record<number, number> = {
    17: 1,
    18: 2,
    16: 3,
    15: 4,
    23: 5,
    13: 6,
    21: 7,
    14: 8,
    11: 9,
    10: 10,
    22: 11,
    20: 12,
    12: 13,
    19: 14,
  };
  private geojsonCache: any = null;

  onModuleInit() {
    const geoJsonPath = path.join(
      process.cwd(),
      'data',
      'electricity-regions.geojson',
    );
    const raw = fs.readFileSync(geoJsonPath, 'utf-8');
    this.geojsonCache = JSON.parse(raw);
    for (const feature of this.geojsonCache?.features) {
      feature.properties.ID = this.regionIdMap[feature.properties.ID];
    }
  }

  async getLiveGenerationMix() {
    try {
      const response = await fetch(
        'https://api.carbonintensity.org.uk/generation',
      );
      const generationMixData = await response.json();
      const generationMix = generationMixData.data;

      console.log('generationMix', generationMix);

      if (!generationMix) {
        throw new Error('GenMix error');
      }

      const labels = generationMix?.generationmix
        .map((type: any) => {
          return type.perc > 0 ? type.fuel : null;
        })
        .filter((label: any) => label !== null);

      const values = generationMix?.generationmix
        .map((type: any) => {
          return type.perc > 0 ? type.perc : null;
        })
        .filter((label: any) => label !== null);

      const data = {
        labels,
        datasets: [
          {
            label: 'generation mix',
            data: values,
            backgroundColor: this.palette,
          },
        ],
      };

      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async getLiveGenMixByPostcode(postcode: string) {
    try {
      const response = await fetch(
        `https://api.carbonintensity.org.uk/regional/postcode/${postcode}`,
      );
      const responsedata = await response.json();
      const intensity = responsedata.data[0].data[0].intensity;
      const generationMix = responsedata.data[0].data[0];

      const labels = generationMix?.generationmix.map((type: any) => {
        return type.fuel;
      });

      const values = generationMix?.generationmix.map((type: any) => {
        return type.perc;
      });

      const pieChartData = {
        labels,
        datasets: [
          {
            label: 'generation mix',
            data: values,
            backgroundColor: this.palette,
          },
        ],
      };

      const intensityData = intensity;

      return {
        pieChartData,
        intensityData,
      };
    } catch (error) {
      console.error(error);
    }
  }

  async getLiveCarbonIntensity() {
    try {
      const response = await fetch(
        'https://api.carbonintensity.org.uk/intensity',
      );
      const intensityData = await response.json();
      const data = intensityData.data[0];

      return data.intensity;
    } catch (error) {
      console.error(error);
    }
  }

  async getLiveIntensityFromTo(from: string, to: string) {
    try {
      let responseData: any;

      const now = Date.now();
      const dateNow = new Date(now).toISOString();
      const MS_IN_DAY = 1000 * 60 * 60 * 24;

      const twoDaysAgo = now - 2 * MS_IN_DAY;
      const dateTwoDaysAgo = new Date(twoDaysAgo).toISOString();

      const isValidDate = (s: string) =>
        s && s !== 'null' && !isNaN(Date.parse(s));

      if (isValidDate(from) && isValidDate(to)) {
        const response = await fetch(
          `https://api.carbonintensity.org.uk/intensity/${from}/${to}`,
        );
        responseData = await response.json();
        if (!responseData?.data) {
          return {
            labels: [],
            datasets: [],
          };
        }
      } else {
        const response = await fetch(
          `https://api.carbonintensity.org.uk/intensity/${dateTwoDaysAgo}/${dateNow}`,
        );
        responseData = await response.json();
        console.log('responseData', responseData);
        if (!responseData?.data) {
          return {
            labels: [],
            datasets: [],
          };
        }
      }

      const labels = responseData?.data.map((intensity: any) => {
        return new Date(intensity.from).toLocaleTimeString();
      });

      const valuesActual = responseData?.data.map((intensity: any) => {
        return intensity.intensity.actual;
      });

      const valuesFroecast = responseData?.data.map((intensity: any) => {
        return intensity.intensity.forecast;
      });

      const fromDate = responseData.data[0].from;
      const toDate = responseData.data[responseData.data.length - 1].to;

      const dates = {
        from: fromDate,
        to: toDate,
      };

      const lineChartData = {
        labels,
        datasets: [
          {
            label: 'generation mix',
            data: valuesActual,
            borderColor: '#7cb36b',
            backgroundColor: '#7cb36b',
          },

          {
            label: 'generation mix',
            data: valuesFroecast,
            borderColor: '#33512a',
            backgroundColor: '#33512a',
          },
        ],
      };

      return {
        lineChartData,
        dates,
      };
    } catch (error) {
      console.error(error);
    }
  }

  async getliveIntensityRegional() {
    try {
      const response = await fetch(
        'https://api.carbonintensity.org.uk/regional',
      );
      const responseData = await response.json();
      const regions: any[] = responseData.data[0]?.regions;

      const geojson = JSON.parse(JSON.stringify(this.geojsonCache));

      geojson.features.forEach((feature, index) => {
        feature.properties = feature.properties || {};
        feature.properties.fillColor =
          this.palette[index % this.palette.length];
      });

      for (const feature of geojson?.features) {
        const match = regions.find(
          (region) => region.regionid === feature.properties.ID,
        );

        if (match) {
          feature.properties['forecast'] = match.intensity.forecast;
          feature.properties['index'] = match.intensity.index;
        }
      }

      geojson.maxValue = Math.max(
        ...geojson.features.map((feature: any) => feature.properties.forecast),
      );

      const regionsObject = {};
      for (const region of regions) {
        regionsObject[region.regionid] = region;
      }

      return {
        geojson,
        regions: regionsObject,
      };
    } catch (error) {
      console.error(error);
    }
  }

  async getCarbonIntensityFactors() {
    try {
      const response = await fetch(
        'https://api.carbonintensity.org.uk/intensity/factors',
      );
      const factorResponseData = await response.json();
      const factorData = factorResponseData.data[0];

      const labels = Object.keys(factorData)?.map((factor: any) => {
        return factor;
      });

      const values = Object.values(factorData)?.map((factor: any) => {
        return factor;
      });

      const data = {
        labels,
        datasets: [
          {
            label: 'Carbon Intensity Factors',
            data: values,
            backgroundColor: this.palette,
          },
        ],
      };

      return data;
    } catch (error) {
      console.error(error);
    }
  }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class CarbonIntensityService {
  private readonly palette: string[] = ['#dbead7', '#c3dcbc', '#abcea1', '#94c186', '#7cb36b', '#66a253', '#558745', '#446c37', '#33512a', '#20331a']
  
  async getLiveGenerationMix() {

    try {
      const response = await fetch('https://api.carbonintensity.org.uk/generation')
      const generationMixData = await response.json()
      const generationMix = generationMixData.data

      if (!generationMix) {
        throw new Error('GenMix error')
      }

      const labels = generationMix?.generationmix.map((type: any) => {
        return type.fuel
      })

      const values = generationMix?.generationmix.map((type: any) => {
        return type.perc
      })

      const data = {
        labels,
        datasets: [
          {
            label: 'generation mix',
            data: values,
            backgroundColor: this.palette
          }
        ]
      }

      return data
    } catch (error) {
      console.error(error)
    }
  }

  async getLiveGenMixByPostcode(postcode: string) {
    try {
      const response = await fetch(`https://api.carbonintensity.org.uk/regional/postcode/${postcode}`)
      const responsedata = await response.json()
      const intensity = responsedata.data[0].data[0].intensity
      console.log(intensity)
      const generationMix = responsedata.data[0].data[0]

      const labels = generationMix?.generationmix.map((type: any) => {
        return type.fuel
      })

      const values = generationMix?.generationmix.map((type: any) => {
        return type.perc
      })

      const pieChartData = {
        labels,
        datasets: [
          {
            label: 'generation mix',
            data: values,
            backgroundColor: this.palette
          }
        ]
      }

      const intensityData = intensity

      return { 
        pieChartData, 
        intensityData
      }
    } catch (error) {
      console.error(error)
    }
  }

  async getLiveCarbonIntensity() {
    try {
      const response = await fetch('https://api.carbonintensity.org.uk/intensity')
      const intensityData = await response.json()
      const data = intensityData.data[0]

      return data.intensity
    } catch (error) {
      console.error(error)
    }
  }

  async getCarbonIntensityFactors() {
    try {
      const response = await fetch('https://api.carbonintensity.org.uk/intensity/factors')
      const factorResponseData = await response.json()
      const factorData = factorResponseData.data[0]

      const labels = Object.keys(factorData)?.map((factor: any) => {
        return factor
      })

      const values = Object.values(factorData)?.map((factor: any) => {
        return factor
      })

      const data = {
        labels,
        datasets: [
          {
            label: 'Carbon Intensity Factors',
            data: values,
            backgroundColor: this.palette
          }
        ]
      }

      return data
    } catch (error) {
      console.error(error)
    }
  }
}
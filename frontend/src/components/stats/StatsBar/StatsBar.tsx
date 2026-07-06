import styles from './StatsBar.module.css'
import { useState, useEffect } from 'react'
import Stat from '../Stat/Stat'

export default function StatsBar() {

  const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL
  const [intensityData, setIntensityData] = useState<any>(null)

  useEffect(() => {
    async function fetchLiveCarbonIntensity() {
      try {
        const response = await fetch(`${backendBaseUrl}/carbon-intensity/live-intensity`)
        const intensityData = await response.json()

        setIntensityData(intensityData)
      } catch (error) {
        console.error(error)
      }

    }
    fetchLiveCarbonIntensity()
  }, [])

  return (
    <div className={styles.container}>
      {intensityData && (
        <>
          <Stat figure={intensityData?.actual} title={'Actual'} borderRight={true}/>
          <Stat figure={intensityData?.index} title={'Index'} borderRight={true}/>
          <Stat figure={intensityData?.forecast} title={'Forecast'} borderRight={false}/>
        </>
      )}

    </div>
  )
}
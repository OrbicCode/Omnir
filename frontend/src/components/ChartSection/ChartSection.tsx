import { useState, useEffect } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import CardSmall from "../cards/CardSmall/CardSmall";
import styles from './ChartSection.module.css'
import useStore from '@stores/useStore'

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ChartSection() {

  const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL
  const [ lgmPieChartData, setLgmPieChartData ] = useState<any>(null)
  const [ factorPieChartData, setFactorPieChartData ] = useState<any>(null)
  const [ genMixPostcodeData, setGenMixPostcodeData ] = useState<any>(null)

  const { postcode, setIntensityPostcodeData }: any = useStore()

  useEffect(() => {
    async function fetchPieChartData() {
      try {
        const response = await fetch(`${backendBaseUrl}/carbon-intensity/live-gen-mix`)
        if (!response.ok) {
          throw new Error('NO RESPONSE')
        }

        const data = await response.json()
        setLgmPieChartData(data)
        return data
      } catch (error) {
        console.error(error)
      }
    }
    fetchPieChartData()
  }, [])

  useEffect(() => {
    async function fetchPieChartData() {
      try {
        const response = await fetch(`${backendBaseUrl}/carbon-intensity/intensity-factors`)
        const data = await response.json()
        setFactorPieChartData(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchPieChartData()
  }, [])

  useEffect(() => {
    async function fetchPieChartData() {
          try {
            const response = await fetch(`${backendBaseUrl}/carbon-intensity/live-gen-mix/postcode/${postcode}`)
            const data = await response.json()
            console.log('data', data)
            setGenMixPostcodeData(data.pieChartData)
            setIntensityPostcodeData(data.intensityData)
          } catch (error) {
            console.error(error)
          }
        }
        fetchPieChartData()
  }, [postcode])

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
    },
  };

  return (
    <section className={styles.section}>
      <CardSmall title={`Live Generation Mix ${postcode ? `(${postcode.toUpperCase()})` : '(UK)'}`}>
        {lgmPieChartData && <Pie data={genMixPostcodeData ? genMixPostcodeData : lgmPieChartData} />}
      </CardSmall>

      <CardSmall title={'Carbon Intensity Factors (UK)'}>
        {factorPieChartData && <Pie data={factorPieChartData} options={options} />}
      </CardSmall>
    </section>
  )
}
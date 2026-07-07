import { useState, useEffect } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import CardSmall from "../cards/CardSmall/CardSmall";
import styles from './ChartSection.module.css'
import useStore from '@stores/useStore'
import CardLong from '../cards/CardLong/CardLong';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

export default function ChartSection() {

  const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL
  const [ lgmPieChartData, setLgmPieChartData ] = useState<any>(null)
  const [ factorPieChartData, setFactorPieChartData ] = useState<any>(null)
  const [ genMixPostcodeData, setGenMixPostcodeData ] = useState<any>(null)
  const [ datedIntensityLineData, setDatedIntensityLineData ] = useState<any>(null)

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
        setGenMixPostcodeData(data.pieChartData)
        setIntensityPostcodeData(data.intensityData)
      } catch (error) {
        console.error(error)
      }
    }
    fetchPieChartData()
  }, [postcode])

  useEffect(() => {
    async function fetchLineChartData() {
      try {
        const response = await fetch(`${backendBaseUrl}/carbon-intensity/live-intensity/from-to/1/2`)
        const data = await response.json()
        setDatedIntensityLineData(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchLineChartData()
  },[])

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
      <CardSmall title={`Live Generation Mix ${postcode ? `(${postcode.toUpperCase()})` : '(UK)'}`} postcode={postcode}>
        {lgmPieChartData && <Pie data={genMixPostcodeData ? genMixPostcodeData : lgmPieChartData} />}
      </CardSmall>

      <CardSmall title={'Carbon Intensity Factors (UK)'}>
        {factorPieChartData && <Pie data={factorPieChartData} options={options} />}
      </CardSmall>

      <CardLong title={`Carbon Intensity from () to ()`}>
        {datedIntensityLineData && <Line data={datedIntensityLineData} />}
      </CardLong>
    </section>
  )
}
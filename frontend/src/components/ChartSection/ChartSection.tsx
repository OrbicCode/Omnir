import { useState, useEffect } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import CardSmall from "../cards/CardSmall/CardSmall";
import styles from './ChartSection.module.css'

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ChartSection() {

  const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL
  const [ lgmPieChartData, setLgmPieChartData ] = useState<any>(null)
  const [ factorPieChartData, setFactorPieChartData ] = useState<any>(null)
  const [ genMixPostcodeData, setGenMixPostcodeData ] = useState<any>(null)
  const [ postcode, setPostcode ] = useState<string>('')

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

  // useEffect(() => {
  //   async function fetchPieChartData() {
  //     try {
  //       const response = await fetch(`${backendBaseUrl}/carbon-intensity/live-gen-mix/postcode/${postcode}`)
  //       const data = await response.json()
  //       setGenMixPostcodeData(data)
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }
  //   fetchPieChartData()
  // }, [])

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
    },
  };

  async function handlePostcodeSubmit(e: any) {
    e.preventDefault()

    console.log('postcode: ', postcode)

    try {
      const response = await fetch(`${backendBaseUrl}/carbon-intensity/live-gen-mix/postcode/${postcode}`)
      const data = await response.json()
      console.log('data', data)
      setGenMixPostcodeData(data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <section className={styles.section}>
      <CardSmall title={'Live Generation Mix'}>
        {lgmPieChartData && <Pie data={lgmPieChartData} />}
      </CardSmall>

      <CardSmall title={'Carbon Intensity Factors'}>
        {factorPieChartData && <Pie data={factorPieChartData} options={options} />}
      </CardSmall>

      <CardSmall title={'Live Generation Mix By Postcode'}>
        <form onSubmit={handlePostcodeSubmit}>
          <input type='text' onChange={(e) => setPostcode(e.target.value)} value={postcode} />
          <button type='submit'>Search</button>
        </form>
        {genMixPostcodeData && postcode && <Pie data={genMixPostcodeData} options={options} />}
      </CardSmall>

    </section>
  )
}
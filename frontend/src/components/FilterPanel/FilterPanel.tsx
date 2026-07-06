import { useState, useEffect } from 'react'
import styles from './FilterPanel.module.css'
import useStore from '@stores/useStore'

export default function FilterPanel() {
    const [ postcodeValue, setPostcodeValue ] = useState<any>('')
    const [ error, setError ] = useState<any>('')

    const { setPostcode, setIntensityPostcodeData }: any = useStore()

    function handlePostcodeSubmit(e: any) {
      e.preventDefault() 

      setPostcode(postcodeValue)
    }

    function handleReset() {
      setPostcodeValue('')
      setIntensityPostcodeData(null)
    }

    useEffect(() => {
      if (postcodeValue.length > 0 && postcodeValue.length !== 4) {
        console.log('nope')
        setError('Postcode must be 4 chracters long')
      } else {
        setError('')
      }
    }, [postcodeValue])
    
  return (
    <section className={styles.container}>
      <h2>Filters</h2>
      <form className={styles.form} onSubmit={handlePostcodeSubmit}>
        <div>
          <label>Postcode</label>
          <input className={styles.postcodeInput} type='text' onChange={(e) => setPostcodeValue(e.target.value)} value={postcodeValue} />
          {error && (
            <p className={styles.error}>{error}</p>
          )}
        </div>
        <div className={styles.buttonSection}>
          <button className={`filter-button`} disabled={error} type='submit'>Apply</button>
          <button onClick={handleReset} className={`${styles.reset} filter-button`} type='button'>
            Reset
          </button>
        </div>
      </form>

    </section>
  )
}
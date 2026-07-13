import { useState, useEffect } from "react";
import styles from "./FilterPanel.module.css";
import useStore from "@stores/useStore";

export default function FilterPanel() {
  const [postcodeValue, setPostcodeValue] = useState<any>("");
  const [fromDateValue, setFromDateValue] = useState<any>("");
  const [toDateValue, setToDateValue] = useState<any>("");
  const [error, setError] = useState<any>("");

  const { setPostcode, setIntensityPostcodeData, setDatetimeFrom, setDatetimeTo }: any = useStore();

  function handleSubmit(e: any) {
    e.preventDefault();

    setPostcode(postcodeValue);
    if (fromDateValue) setDatetimeFrom(fromDateValue);
    if (toDateValue) setDatetimeTo(toDateValue);
  }

  function handleReset() {
    setPostcodeValue("");
    setPostcode(null);
    setIntensityPostcodeData(null);
  }

  useEffect(() => {
    if (postcodeValue.length > 0 && postcodeValue.length !== 4) {
      setError("Postcode must be 4 chracters long");
    } else {
      setError("");
    }
  }, [postcodeValue]);

  return (
    <section className={styles.container}>
      <h2>Filters</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.filters}>
          <div>
            <label>Postcode</label>
            <input className={styles.input} type='text' onChange={(e) => setPostcodeValue(e.target.value)} value={postcodeValue} />
            {error && <p className={styles.error}>{error}</p>}
          </div>
          <div>
            <label>Datetime From</label>
            <input className={styles.input} type='datetime-local' onChange={(e) => setFromDateValue(e.target.value)} />
          </div>
          <div>
            <label>Datetime To</label>
            <input className={styles.input} type='datetime-local' onChange={(e) => setToDateValue(e.target.value)} />
          </div>
        </div>

        <div className={styles.buttonSection}>
          <button className={`filter-button`} disabled={error} type='submit'>
            Apply
          </button>
          <button onClick={handleReset} className={`${styles.reset} filter-button`} type='button'>
            Reset
          </button>
        </div>
      </form>
    </section>
  );
}

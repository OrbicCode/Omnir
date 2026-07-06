import styles from './Stat.module.css'

export default function Stat({ title, figure, borderRight }: any) {
  
  return (
    <div className={`${styles.container} ${borderRight ? 'border-right' : ''}`}>
      <h3>{title}</h3>
      <p className={styles.figure}>{figure}</p>
    </div>
  )
}
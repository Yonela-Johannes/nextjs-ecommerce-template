import styles from './Center.module.css'

export default function Center ({children}) {
  return (
    <div className={styles.center}>{children}</div>
  )
}

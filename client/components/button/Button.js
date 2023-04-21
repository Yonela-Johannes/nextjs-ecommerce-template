import styles from './Button.module.css'
export default function Button ({type, title, icon, click}) {
  return (
    <button onClick={click} className={type == "primary" && styles.primary || type == 'secondary' && styles.secondary || type == 'tertiary' && styles.tertiary || styles.landing}>{title || ""}
      {icon || ''}
    </button>
  )
}

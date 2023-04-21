import Product from './Product'
import styles from './Products.module.css'
import Center from '../center/Center'

export default function NewProducts ({products}) {
  return (
    <Center>
      <div className={styles.grid}>
          {products.length > 0 && products.map((product) => <Product key={product._id} product={product} />)}
      </div>
    </Center>
  )
}

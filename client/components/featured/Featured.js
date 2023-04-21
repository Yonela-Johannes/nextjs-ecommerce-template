import Image from "next/image";
import Center from "../center/Center";
import yonga from '../../assets/img/pic.jpeg'
import styles from './Featured.module.css'
import Button from "../button/Button";
import ButtonLink from "../button/ButtonLink";
import { CartContext } from "../cart/CartContext";
import { useContext } from "react";

export default function Featured ({product}) {
  const { cartProducts, setCartProducts } = useContext(CartContext);

  function addFeaturedToCart () {
    console.log("This we clicked")
    setCartProducts(prev => [...prev, product._id]);
  }
  return (
  <div className={styles.bg}>
    <Center>
      <div className={styles.wrapper}>
      <div className={styles.column}>
        <div>
          <h1 className={styles.title}>{product?.name}</h1>
          <p className={styles.desc}>{product?.description}</p>
          <ButtonLink href={'/products/'+product._id}
            type="landing"
            className={styles.button}
            title="Read more"
            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
            }
            >Read more</ButtonLink>
          <Button click={addFeaturedToCart}
            type="landing"
            title="Add to cart"
            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            }
            />
        </div>
      </div>
        <div className={styles.column}>
          <Image src={product?.imageUrl} alt="product" width={360} height={360}  className={styles.image}/>
        </div>
      </div>
    </Center>
  </div>
  )
}

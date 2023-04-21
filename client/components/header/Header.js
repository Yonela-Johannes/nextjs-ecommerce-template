import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import logo from '../../assets/img/AlphaBlack.png'
import { CartContext } from "../cart/CartContext";
import Center from "../center/Center";
import styles from './Header.module.css'

export default function Header (){
  const { cartProducts } = useContext(CartContext);

  return (
    <div className={styles.header}>
      <Center>
        <div className={styles.wrapper}>
          <Link href={'/'}>
            <Image src={logo} alt="logo" width={30} height={30} />
          </Link>
          <div className={styles.nav}>
            <Link className={styles.navLink} href="/" >Home</Link>
            <Link className={styles.navLink} href="/products" >All products</Link>
            <Link className={styles.navLink} href="/categories" >Categories</Link>
            <Link className={styles.navLink} href="/accounts" >Accounts</Link>
            <Link className={styles.navLink} href="/cart" >Cart ({cartProducts.length})</Link>
          </div>
        </div>
      </Center>
    </div>
  )
}

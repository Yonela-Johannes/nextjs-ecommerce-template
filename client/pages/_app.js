import { CartContextProvider } from '@/components/cart/CartContext'
import './_app.css'
export default function App({ Component, pageProps }) {
  return(
    <>
      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider>
    </>
  )
}

import Featured from '@/components/featured/Featured'
import Header from '@/components/header/Header'
import NewProducts from '@/components/new_products/NewProducts';
import { Product } from '@/lib/models/product';
import { mongooseConnect } from '@/lib/mongoose';

export default function HomePage({featuredProduct, newProducts}) {
  console.log(newProducts)
  return (
    <div>
      <Header />
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} />
    </div>
  )
}

export async function getServerSideProps () {
  const featuredProductId = '6441e47daddc38f6babaf25f';
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {sort: {'_id': -1}, limit: 5})

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    }
  };
}

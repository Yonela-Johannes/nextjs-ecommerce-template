import Layout from "@/components/Layout";
import {useEffect, useState } from "react";
import axios from 'axios'
import { useRouter } from "next/router";
import ProductForm from "@/components/ProductForm";

export default function EditProductPage () {
  const router = useRouter()
  const { id } = router.query;
  const [productInfo, setProductInfo] = useState('')
  useEffect(() => {
    if(!id) return;
    axios.get('/api/products?id='+id).then(res => (
      setProductInfo(res.data)
    ))
  }, [id])

  return (
    <Layout>
    <h1>Edit Product</h1>
      {productInfo && (<ProductForm {...productInfo } />)}
    </Layout>
  )
}

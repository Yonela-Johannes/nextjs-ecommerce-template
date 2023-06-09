import { useEffect, useState } from "react";
import axios from 'axios'
import { useRouter } from "next/router";


export default function ProductForm ({
  _id,
  name: existingName,
  imageUrl: existingImageUrl,
  description: existingDescription,
  price: existingPrice,
  category: assignedCategory,
  properties: assignedProperties,
}) {
  const router = useRouter()
  const [name, setName] = useState(existingName || '');
  const [image, setImage] = useState('')
  const [imageUrl, setImageUrl] = useState(existingImageUrl || '')
  const [description, setDescription] = useState(existingDescription || '');
  const [price, setPrice] = useState(existingPrice || '');
  const [goToProducts, setGoToProducts] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(assignedCategory || '');
  const [productProperties, setProductProperties] = useState(assignedProperties || {});

  useEffect(() => {
    axios.get('/api/categories').then(res => setCategories(res.data))
  }, [])
  async function saveProduct(e) {
    const data = { name, description, price, category,
      properties: productProperties};
    e.preventDefault()
    if(_id){
      // update product
      await axios.put('/api/products', {...data, _id});
    }else{
      // create product
      const formData = new FormData();
      formData.append("file", image)
      formData.append("upload_preset", "aw0g74pr");
      await axios.post('https://api.cloudinary.com/v1_1/dxmh1l3gy/image/upload',
      formData).then((res) =>  axios.post('/api/products', {...data, imageUrl: res?.data?.url})
      )
    }
    setGoToProducts(true)
  }

  if(goToProducts){
    router.push('/products');
  }

  const propertiesToFill = []
  if (categories.length > 0 && category) {
    let catInfo = categories.find(({_id}) => _id === category);
    propertiesToFill.push(...catInfo?.properties);
    while(catInfo?.parent?._id){
      const parentCat = categories.find(({_id}) => _id === catInfo?.parent?._id)
      propertiesToFill.push(...parentCat.properties);
      catInfo = parentCat;
    }
  }

  function setProductProp (propName, value) {
    setProductProperties(prev => {
      const newProductProps = {...prev};
      newProductProps[propName] = value;
      return newProductProps;
    });
  }

  return (
      <form onSubmit={saveProduct}>
        <label>Product name</label>
        <input value={name} type="text" placeholder="enter name" onChange={e => setName(e.target.value)} />
        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value={''}>Uncategorized</option>
          {categories.length > 0 && categories.map((c) => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>
        {propertiesToFill.length > 0 && propertiesToFill.map(p => (
          <div key={p._id}
            className="flex gap-1">
              <div className="">{p.name}</div>
              <select
                value={productProperties[p.name]}
                onChange={(e) => setProductProp(p.name, e.target.value)}
              >
                {p.values.map((v, i) => (
                  <option key={i} value={v}>{v}</option>
                ))}
              </select>
          </div>
        ))}
        <label>Product photo</label>
        <div className="mb-2 flex">
            <label className="w-24 h-24 border cursor-pointer rounded-none p-0 bg-white text-gray-500 text-sm flex text-center items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              <div>
                Upload
              </div>
              <input className="hidden" type="file" placeholder="enter name" onChange={(e) => setImage(e.target.files[0])} />
            </label>
          {imageUrl && (
            <div className="">
                <img
                  className='w-24 h24'
                  src={imageUrl}
                  alt="product"
                />
            </div>
          )}
        </div>
        <label>Description</label>
        <textarea value={description} placeholder="enter description" onChange={e => setDescription(e.target.value)} />
        <label>Price (R)</label>
        <input value={price} type="number" placeholder="enter price" onChange={e => setPrice(e.target.value)} />
        <button type="submit" className="btn-primary">{_id ? "Update" : "Save"}</button>
      </form>
  )
}

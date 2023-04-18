import { Product } from '@/lib/models/Product';
import { mongooseConnect } from '@/lib/mongoose';

export default async function handler(req, res) {
  const { method } = req;
  await mongooseConnect();

  if(method === 'GET'){
    if(req.query?.id){
      res.json(await Product.findOne({_id:req.query.id}))
    }else{
      res.json(await Product.find());
    }
  }

  if(method === 'POST') {
    const {name, description, price, imageUrl} = req.body
    const productDocument = await Product.create({
      name, imageUrl, description, price,
    });
    res.json(productDocument);
  }

  if(method == 'PUT') {
    const {name, imageUrl, description, price, _id} = req.body
    const productDocument = await Product.updateOne({_id}, {name, imageUrl, description, price,
    });
    res.json(productDocument);
  }

  if(method === 'DELETE') {
    if(req.query?.id){
      await Product.deleteOne({_id:req.query?.id})
      res.json(true)
    }
  }
}
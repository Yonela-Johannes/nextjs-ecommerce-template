import { Schema, mongoose } from 'mongoose';

const ProductSchema = new Schema({
  name: {type: String, required: true},
  imageUrl: {type: String, required: true},
  description: {type: String, required: true},
  price: {type: Number, required: true},
});

export const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema )

import mongoose, { Schema } from 'mongoose';

const ProductSchema = new Schema({
  name: {type: String, required: true},
  imageUrl: {type: String, required: true},
  description: {type: String, required: true},
  price: {type: Number, required: true},
  category: {type: mongoose.Types.ObjectId, ref: "Category"},
  properties: {type: Object},
});

export const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema )

// product.model.js
import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "products";
const schema = new Schema(
  {
    sku: { type: String, required: true },
    title: { type: String, required: true },
    photo: { type: String, required: true },
    category: { type: String, required: true },
    container: { type: String, required: true },
    ltscontainer: { type: String, required: true },
    stock: { type: Number, required: true },
    liters: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

schema.plugin(mongoosePaginate);
const Product = model(collection, schema);
export default Product;

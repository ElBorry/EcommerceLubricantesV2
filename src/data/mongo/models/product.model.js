import { model, Schema, Types } from "mongoose";
import mongossePaginate from "mongoose-paginate-v2";

const collection = "products";

const schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    photo: {
      type: String,
      default: "/assets/icons/imagepreview.png",
    },
    category: {
      type: String,
      default: "Action",
    },
    price: {
      type: Number,
      default: 1,
    },
    stock: {
      type: Number,
      default: 1,
    },
    supplier_id: {
      type: Types.ObjectId,
      ref: "users",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

schema.pre("find", function () {
  this.populate("supplier_id");
});

schema.pre("findOne", function () {
  this.populate({ path: "supplier_id" });
});

schema.plugin(mongossePaginate);

export const Product = model(collection, schema);

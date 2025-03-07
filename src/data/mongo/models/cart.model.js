import { Schema, model, Types } from "mongoose";

const collection = "carts";
const schema = new Schema(
  {
    user_id: {
      type: Types.ObjectId,
      ref: "users",
      required: true,
      index: true,
    },
    product_id: {
      type: Types.ObjectId,
      ref: "products",
      required: true,
      index: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    state: {
      type: String,
      enum: ["reserved", "paid", "delivered"],
      default: "reserved",
    },
  },
  {
    timestamps: true,
  }
);

schema.pre("find", function () {
  this.populate("user_id");
});
schema.pre("find", function () {
  this.populate("product_id");
});
schema.pre("findOne", function () {
  this.populate({ path: "product_id" });
  this.populate({ path: "user_id" });
});

export const Cart = model(collection, schema);

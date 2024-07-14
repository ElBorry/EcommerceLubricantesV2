import { Schema, model } from "mongoose";

const collection = "users";
const schema = new Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    photo: {
      type: String,
      default:
        "https://blog.hubspot.es/hubfs/Co%CC%81mo%20hacer%20una%20marca%20personal.jpg",
    },
    role: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const User = model(collection, schema);

export default User;

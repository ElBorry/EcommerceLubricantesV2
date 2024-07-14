import { Schema, model, Types } from "mongoose"; 

const collection = "carts"
const cartSchema = new Schema(  
    {
        user_Id: { type: Types.ObjectId, required: true, index: true, ref: "users"},
        product_Id: { type: Types.ObjectId, required: true, index: true, ref: "products"},
        quantity: { type: Number, required: true },
        state: {
            type: String,
            enum: ["reserved", "paid", "delivered"],
            default: "reserved",
        },
    },
    { timestamps: true } 
);

cartSchema.pre("find", function(){
    this.populate("user_Id").populate("product_Id");
})

const Cart = model(collection, cartSchema); 
export default Cart;

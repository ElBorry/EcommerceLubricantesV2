import { Types } from "mongoose";
import cartsManager from "../data/mongo/CartsManager.mongo.js";


//Calculate the total sum of the products in the cart (user_id)
export const sumTotal = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const ticket = await cartsManager.aggregate([
      { $match: { user_id: new Types.ObjectId(uid) } },
      {
        $lookup: {
          foreignField: "_id",
          from: "products",
          localField: "product_id",
          as: "product_id",
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ["$product_id", 0] }, "$$ROOT"],
          },
        },
      },
      { $set: { subTotal: { $multiply: ["$quantity", "$price"] } } },
      { $group: { _id: "$user_id", subTotal: { $sum: "$subTotal" } } },
      {
        $project: {
          _id: 0,
          user_id: "$_id",
          subTotal: { $trunc: ["$subTotal", 3] },
          total: { $trunc: [{ $add: ["$subTotal", 2.99] }, 3] },
          date: new Date(),
        },
      },
      //   { $merge: { into: "tickets" } },
    ]);
    return res.response200(ticket);
  } catch (error) {
    return next(error);
  }
};

// Create a new ticket and redirect to Stripe for payment
export const create = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const [cart] = await cartsManager.aggregate([
      { $match: { user_id: new Types.ObjectId(uid) } },
      {
        $lookup: {
          from: "products",
          localField: "product_id",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      { $set: { subTotal: { $multiply: ["$quantity", "$product.price"] } } },
      { $group: { _id: "$user_id", subTotal: { $sum: "$subTotal" } } },
      { $project: { _id: 0, user_id: "$_id", subTotal: { $trunc: ["$subTotal", 2] }, total: { $add: ["$subTotal", 2.99] }, date: new Date() } },
      { $merge: { into: "tickets" } },
    ]);

    if (!cart) {
      return res.status(404).json({ error: "No cart found for this user." });
    }

    console.log("Cart details:", cart);
    // Crear una sesión de pago en Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Compra de productos",
            },
            unit_amount: cart.total * 100, // Stripe usa centavos
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:8080/pages/thanks.html?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:8080/pages/cart/cart.html",
    });

    console.log("Cart details:", cart);

    // Redirigir a Stripe para completar el pago
    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Error in create:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
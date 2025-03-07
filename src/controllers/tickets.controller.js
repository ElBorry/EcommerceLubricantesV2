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

//Create a new ticket
export const create = async (req, res, next) => {
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
      { $merge: { into: "tickets" } },
    ]);
    return res.message200("Purchase made");
  } catch (error) {
    return next(error);
  }
};

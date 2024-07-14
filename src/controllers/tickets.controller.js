import { aggregateService } from "../services/carts.service.js"
import { Types } from "mongoose";

async function read(req, res, next) {
  try {
    const user = req.user._id;
    const ticket = await aggregateService([
      {
        $match: {
          user_id: new Types.ObjectId(user),
        },
      },
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
      {
        $set: {
          subTotal: { $multiply: ["$quantity", "$price"] },
        },
      },
      { $group: { _id: "$user_id", total: { $sum: "$subTotal" } } },
      {
        $project: { _id: 0, user_id: "$_id", total: "$total", date: new Date() },
      },
    ]);
    return res.response200(ticket);
  } catch (error) {
    return next(error);
  }
}

export { read };

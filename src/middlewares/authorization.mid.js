import { readOneService } from "../services/products.service.js";

const authorizationProductManagement = async (req, res, next) => {
  //0 Normal User | 1 Admin User | 2 Premium User
  const { role, _id } = req.user;
  const { pid } = req.params;

  // Check if the product exists
  const product = await readOneService({ _id: pid });
  if (!product) {
    const error = new Error("Product not found!");
    error.statusCode = 404;
    throw error;
  }

  if (role === 1) {
    return next();
  } else if (role === 2 && _id === product.supplier_id._id.toString()) {
    return next();
  } else {
    const error = new Error("Bad auth from policies!");
    error.statusCode = 401;
    throw error;
  }
};

export default authorizationProductManagement;

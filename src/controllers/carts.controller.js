import {
  createService,
  destroyAllService,
  destroyService,
  readOneService,
  readService,
  updateService,
} from "../services/carts.service.js";

//Create a new cart Item (user_id)
export const create = async (req, res, next) => {
  try {
    const data = req.body;
    const newCartItem = await createService(data);
    return newCartItem
      ? res.message201("Item added successfully")
      : res.error404("Error adding item to cart");
  } catch (error) {
    return next(error);
  }
};

//Read <- get all items by user_id
export const read = async (req, res, next) => {
  try {
    const { uid } = req.query;
    const cartItems = await readService({ user_id: uid });
    return cartItems
      ? res.response200(cartItems)
      : res.error404("Not found items");
  } catch (error) {
    return next(error);
  }
};

//Read individual cart item
export const readOne = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cartItem = await readOneService(cid);
    return cartItem
      ? res.response200(cartItem)
      : res.error404("Not found product with that ID!");
  } catch (error) {
    return next(error);
  }
};

//Update a cart item
export const update = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const data = req.body;
    const updateCartItem = await updateService(cid, data);
    return updateCartItem
      ? res.response200(updateCartItem)
      : res.error404("Not found item with that ID to update!");
  } catch (error) {
    return next(error);
  }
};

//Delete a cart item
export const destroy = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const deleteCartItem = await destroyService(cid);
    return deleteCartItem
      ? res.message200("Item deleted successfully")
      : res.error404("Error deleting item");
  } catch (error) {
    return next(error);
  }
};

//Delete all cart items
export const destroyAll = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const deleteCartItem = await destroyAllService(uid);
    return deleteCartItem
      ? res.message200("Empty shopping cart")
      : res.error404("Error deleting shopping cart");
  } catch (error) {
    return next(error);
  }
};

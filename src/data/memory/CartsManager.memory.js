class CartsManager {
  static #carts = [];
  create(data) {
    try {
      //Add new product to array carts
      CartsManager.#carts.push(data);
      console.log("Cart Item added:", data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  read = () => {
    try {
      return CartsManager.#carts;
    } catch (error) {
      console.log(error);
    }
  };

  readOne = (id) => {
    try {
      const cartItemById = CartsManager.#carts.find(
        (item) => item._id === id
      );
      if (!cartItemById) {
        throw new Error("Cart Item not found!!");
      } else {
        return cartItemById;
      }
    } catch (error) {
      console.log(error);
    }
  };

  update = (id, data) => {
    try {
      const cartItemToUpdate = this.readOne(id);
      Object.assign(cartItemToUpdate, data);
      return cartItemToUpdate;
    } catch (error) {
      console.log(error);
    }
  };

  destroy = (id) => {
    try {
      const findCartItemExists = this.readOne(id);
      CartsManager.#carts = CartsManager.#carts.filter(
        (product) => product._id !== findCartItemExists._id
      );
      console.log("Cart Item deleted:", findCartItemExists);
      return findCartItemExists;
    } catch (error) {
      console.log(error);
    }
  };
}

const cartsManager = new CartsManager();
export default cartsManager;

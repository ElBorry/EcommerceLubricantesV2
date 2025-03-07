import crypto from "crypto";

class ProductsManager {
  static #products = [];
  create(data) {
    try {
      //Add new product to array products
      ProductsManager.#products.push(data);
      console.log("Product added:", data);
      return data
    } catch (error) {
      console.log(error);
    }
  }

  read = () => {
    try {
      return ProductsManager.#products;
    } catch (error) {
      console.log(error);
    }
  };

  readOne = (id) => {
    try {
      const productById = ProductsManager.#products.find(
        (product) => product._id === id
      );
      if (!productById) {
        throw new Error("Product not found!!");
      } else {
        return productById;
      }
    } catch (error) {
      console.log(error);
    }
  };

  update = (id, data) => {
    try {
      const productToUpdate = this.readOne(id);
      Object.assign(productToUpdate, data);
      return productToUpdate;
    } catch (error) {
      console.log(error);
    }
  };

  destroy = (id) => {
    try {
      const findProductExists = this.readOne(id);
      ProductsManager.#products = ProductsManager.#products.filter(
        (product) => product._id !== findProductExists._id
      );
      console.log("Product deleted:", findProductExists);
      return findProductExists;
    } catch (error) {
      console.log(error);
    }
  };
}

const productsManager = new ProductsManager();
export default productsManager;

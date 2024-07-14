import crypto from "crypto";
class CartManager {
  static #carts = [];
  //Method to create a new Cart:
  async create(data) {
    try {
      // const one = {
      //   id: data.id || crypto.randomBytes(12).toString("hex"),
      //   user_id: data.user_id || crypto.randomBytes(12).toString("hex"),
      //   product_id: data.product_id || crypto.randomBytes(12).toString("hex"),
      //   quantity: data.quantity,
      //   state: data.state,
      // };
      //CartManager.#carts.push(one);
      CartManager.#carts.push(data);
      console.log("Cart created");
      return data;
    } catch (error) {
      throw error;
    }
  }
  //Method to read cart list by filter (user_id):
  async read(filter) {
    try {
      if (CartManager.#carts.length === 0) {
        const error = new Error("NOT FOUND");
        error.statusCode = 404;
        throw error;
      } else {
        if (filter) {
          const all = CartManager.#carts.filter(
            (cart) => cart.user_id === filter
          );
          if (!all) {
            const error = new Error("NOT FOUND");
            error.statusCode = 404;
            throw error;
          }
          return all;
        } else {
          const all = CartManager.#carts;
          return all;
        }
      }
    } catch (error) {
      throw error;
    }
  }
  //Method to find and read one Cart from the list:
  async readOne(id) {
    try {
      const one = CartManager.#carts.find((cart) => cart._id === id);
      if (one !== undefined) {
        console.log("Cart found:");
        return one;
      } else {
        const error = new Error("NOT FOUND");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }

  //Method to update a cart by id
  async update(id, data) {
    try {
      let one = this.readOne(id);
      if (!one) {
        const error = new Error("NOT FOUND");
        error.statusCode = 404;
        throw error;
      } else {
        for (let prop in data) {
          one[prop] = data[prop];
        }
        return one;
      }
    } catch (error) {
      throw error;
    }
  }

  //Method to delete a Cart from the list:
  async destroy(id) {
    try {
      let one = this.readOne(id);
      if (!one) {
        const error = new Error("NOT FOUND");
        error.statusCode = 404;
        throw error;
      } else {
        const newArray = CartManager.#carts.filter((cart) => cart._id !== id);
        CartManager.#carts = newArray;
        console.log("Cart deleted:");
        return one;
      }
    } catch (error) {
      throw error;
    }
  }
  //Method to delete all Cart of a given user_id:
  async destroyAll(user_id) {
    try {
      const removedCarts = await this.read(user_id);
      if (!removedCarts) {
        const error = new Error("NOT FOUND");
        error.statusCode = 404;
        throw error;
      } else {
        console.log(removedCarts);
      }
    } catch (error) {
      throw error;
    }
  }
}

const cartManager = new CartManager();

// async function test() {
//   await cartManager.create({
//     quantity: 1,
//     state: "reserved",
//   });

//   await cartManager.create({
//     quantity: 2,
//     state: "paid",
//   });

//   await cartManager.create({
//     quantity: 4,
//     state: "delivered",
//   });

//   await cartManager.create({
//     id: "0123456789101",
//     quantity: 10,
//     state: "reserved",
//   });

  // console.log("Carts List:");
  // console.log(await cartManager.read());
  // console.log(await cartManager.readOne("0123456789101"));
  // console.log(
  //   await cartManager.update("0123456789101", { quantity: 4, state: "delivered" })
  // );
  // console.log("Carts List:");
  // console.log(await cartManager.read());
  // console.log(await cartManager.destroy("0123456789101"));
  // console.log(await cartManager.readOne("0123456789101"));
// }

// test();

export default cartManager;

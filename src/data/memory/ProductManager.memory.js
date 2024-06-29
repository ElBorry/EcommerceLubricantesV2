import crypto from "crypto";
class ProductManager {
  static #products = [];
  //Method to create a product:
  async create(data) {
    try {
      // const one = {
      //   id: data.id || crypto.randomBytes(12).toString("hex"),
      //   title: data.title,
      //   photo: data.photo || "foto_default.jpg",
      //   category: data.category,
      //   price: data.price,
      //   stock: data.stock,
      // };
      //ProductManager.#products.push(one);
      ProductManager.#products.push(data);
      console.log("Product created successfully");
      return data;
    } catch (error) {
      throw error;
    }
  }
  //Method to read product list by filter (category):
  async read(filter) {
    try {
      if (ProductManager.#products.length === 0) {
        const error = new Error("NOT FOUND");
        error.statusCode = 404;
        throw error;
      } else {
        if (filter) {
          const all = ProductManager.#products.filter(
            (prod) => prod.category === filter
          );
          if (!all) {
            const error = new Error("NOT FOUND");
            error.statusCode = 404;
            throw error;
          }
          return all;
        } else {
          const all = ProductManager.#products;
          return all;
        }
      }
    } catch (error) {
      throw error;
    }
  }

  //Method to find and read one Product from the list:
  async readOne(id) {
    try {
      const one = ProductManager.#products.find((product) => product._id === id);
      if (one !== undefined) {
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

  //Method for pagination:
  async paginate({ filter, opts }) {
    try {
      let products = await this.read();
      if (filter.category) {
        products = products.filter((product) =>
          product.category.includes(filter.category)
        );
      }
      const page = opts.page || 1;
      const limit = opts.limit || 10;
      const skip = (page - 1) * limit;
      const paginatedProducts = products.slice(skip, skip + limit);
      const totalDocs = products.length;
      if (totalDocs === 0) {
        const error = new Error("There aren't any documents");
        error.statusCode = 404;
        throw error;
      }
      const all = {
        docs: paginatedProducts,
        totalDocs,
        limit,
        page,
        totalPages: Math.ceil(totalDocs / limit),
      };
      return all;
    } catch (error) {
      throw error;
    }
  }

  //Method to update one Product from the list:
  async update(id, data) {
    try {
      let one = await this.readOne(id);
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

  //Method to delete a product by id:
  async destroy(id) {
    try {
      let one = await this.readOne(id);
      if (!one) {
        const error = new Error("NOT FOUND");
        error.statusCode = 404;
        throw error;
      } else {
        const newArray = ProductManager.#products.filter(
          (product) => product.id !== id
        );
        ProductManager.#products = newArray;
        return one;
      }
    } catch (error) {
      throw error;
    }
  }
}

const productManager = new ProductManager();

export default productManager;

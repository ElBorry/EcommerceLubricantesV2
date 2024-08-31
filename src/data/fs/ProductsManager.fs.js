import fs from "fs";
import crypto from "crypto";
import { createFile, createFileNP, readFile } from "./helpers/manageFiles.js";

class ProductsManager {
  constructor() {
    this.path = "./src/data/fs/files/products.json";
    this.init();
  }
  init = () => {
    const exists = fs.existsSync(this.path);
    if (!exists) {
      const stringData = JSON.stringify([], null, 2);
      fs.writeFileSync(this.path, stringData);
    }
  };

  create = async (data) => {
    try {
      let fileTotal = await readFile(this.path);
      await createFileNP(this.path, fileTotal, data);
      return data;
    } catch (error) {
      throw error;
    }
  };

  read = async (category) => {
    try {
      let fileTotal = await readFile(this.path);
      category &&
        (fileTotal = fileTotal.filter(
          (each) => each.category.toLowerCase() === category.toLowerCase()
        ));
      return fileTotal;
    } catch (error) {
      throw error;
    }
  };

  readOne = async (id) => {
    try {
      let fileTotal = await readFile(this.path);
      let itemId = fileTotal.find((item) => item._id === id);
      return itemId;
    } catch (error) {
      throw error;
    }
  };
  update = async (id, data) => {
    try {
      let fileTotal = JSON.parse(
        await fs.promises.readFile(this.path, "utf-8")
      );
      const product = fileTotal.find((product) => product._id === id);
      if (product) {
        Object.assign(product, data);
        await createFile(this.path, fileTotal);
      }
      return product;
    } catch (error) {
      throw error;
    }
  };

  destroy = async (id) => {
    try {
      let fileTotal = await readFile(this.path);
      let productDelete = await this.readOne(id);

      if (productDelete) {
        console.log("Product deleted:", productDelete);
        let productsFilter = fileTotal.filter((product) => product._id !== id);
        await createFile(this.path, productsFilter);
      }
      return productDelete;
    } catch (error) {
      throw error;
    }
  };
}

const productsManager = new ProductsManager();
export default productsManager;

import Manager from "../Manager.mongo.js";
import { Product } from "../models/product.model.js";

export const productsManager = new Manager(Product);

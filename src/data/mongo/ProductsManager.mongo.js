import Manager from "./Manager.mongo.js";
import { Product } from "./models/product.model.js";

const productsManager = new Manager(Product);
export default productsManager;

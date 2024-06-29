import argsUtil from "../utils/args.util.js";
import crypto from "crypto";

const persistence = argsUtil.persistence;

class ProductsDTO {
    constructor(data) {
        persistence !== "mongo" && (this._id = crypto.randomBytes(12).toString("hex"));
        this.title = data.title;
        this.photo = data.photo || "https://www.yoghurtdigital.com.au/wp-content/uploads/2021/10/2-1024x546.png";
        this.category = data.category;
        this.price = data.price || 1;
        this.stock = data.stock || 1;
        persistence !== "mongo" && (this.createdAt = new Date());
        persistence !== "mongo" && (this.updatedAt = new Date());
        persistence !== "mongo" && (this.__v = 0);
    }
}

export default ProductsDTO;
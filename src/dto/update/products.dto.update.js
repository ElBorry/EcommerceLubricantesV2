import argsUtil from "../../utils/args/args.util.js";

const persistence = argsUtil.persistence;

class UpdateProductsDto {
  constructor(data) {
    if (data.title) this.title = data.title;
    if (data.photo) this.photo = data.photo;
    if (data.category) this.category = data.category;
    if (data.price) this.price = data.price;
    if (data.stock) this.stock = data.stock;
    persistence !== "mongo" && (this.updatedAt = new Date());
  }
}

export default UpdateProductsDto;

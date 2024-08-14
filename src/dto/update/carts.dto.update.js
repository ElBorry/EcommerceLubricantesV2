import argsUtil from "../../utils/args/args.util.js";

const persistence = argsUtil.persistence;

class UpdateCartsDto {
  constructor(data) {
    if (data.quantity) this.quantity = data.quantity;
    if (data.state) this.state = data.state;
    persistence !== "mongo" && (this.updatedAt = new Date());
  }
}

export default UpdateCartsDto;

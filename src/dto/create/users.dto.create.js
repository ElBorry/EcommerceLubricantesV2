import crypto from "crypto";

import argsUtil from "../../utils/args/args.util.js";
import { createHash } from "../../utils/hashPassword/hashPassword.js";

const persistence = argsUtil.persistence;

class CreateUsersDto {
  constructor(data) {
    persistence !== "mongo" &&
      (this._id = crypto.randomBytes(12).toString("hex"));
    this.username = data.username || "USER";
    this.email = data.email;
    this.password = createHash(data.password);
    this.role = data.role || 0;
    this.photo = data.photo || "/assets/icons/avatar.png";
    this.verify = data.verify || false;
    this.code = crypto.randomBytes(6).toString("hex");
    persistence !== "mongo" && (this.createdAt = new Date());
    persistence !== "mongo" && (this.updatedAt = new Date());
  }
}

export default CreateUsersDto;

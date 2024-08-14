import argsUtil from "../../utils/args/args.util.js";
import { createHash } from "../../utils/hashPassword/hashPassword.js";

const persistence = argsUtil.persistence;

class UpdateUsersDto {
  constructor(data) {
    if (data.username) this.username = data.username;
    if (data.password) this.password = createHash(data.password);
    if (data.photo) this.photo = data.photo;
    if (data.verify) this.verify = data.verify;
    if (data.code) this.code = data.code;
    persistence !== "mongo" && (this.updatedAt = new Date());
  }
}

export default UpdateUsersDto;

import fs from "fs";
import crypto from "crypto";
import { createFile, createFileNP, readFile } from "./helpers/manageFiles.js";

class UsersManager {
  constructor() {
    this.path = "./src/data/fs/files/users.json";
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

  read = async (role) => {
    try {
      let fileTotal = await readFile(this.path);
      role && (fileTotal = fileTotal.filter((user) => user.role === role));
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

  readByEmail = async (email) => {
    try {
      let fileTotal = await readFile(this.path);
      let itemEmail = fileTotal.find((item) => item.email === email);
      return itemEmail;
    } catch (error) {
      throw error;
    }
  };

  update = async (id, data) => {
    try {
      let fileTotal = JSON.parse(
        await fs.promises.readFile(this.path, "utf-8")
      );
      const user = fileTotal.find((user) => user._id === id);
      if (user) {
        Object.assign(user, data);
        await createFile(this.path, fileTotal);
      }
      return user;
    } catch (error) {
      throw error;
    }
  };

  destroy = async (id) => {
    try {
      let fileTotal = await readFile(this.path);
      let userDelete = await this.readOne(id);

      if (userDelete) {
        console.log("User deleted:", userDelete);
        let usersFilter = fileTotal.filter((users) => users._id !== id);
        await createFile(this.path, usersFilter);
      }
      return userDelete;
    } catch (error) {
      throw error;
    }
  };
}

const usersManager = new UsersManager();
export default usersManager;

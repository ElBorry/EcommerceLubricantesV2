import crypto from "crypto"; //Create id random with hexa

class UsersManager {
  static #users = [];
  create(data) {
    try {
      //Add new user to array uers
      UsersManager.#users.push(data);
      return data
    } catch (error) {
      console.log(error);
    }
  }

  read = () => {
    try {
      return UsersManager.#users;
    } catch (error) {
      console.log(error);
    }
  };

  readOne = (id) => {
    try {
      const userById = UsersManager.#users.find(
        (user) => user._id === id
      );
      if (!userById) {
        throw new Error("User not found!!");
      } else {
        return userById;
      }
    } catch (error) {
      console.log(error);
    }
  };

  readByEmail = async (email) => {
    try {
      const userFound = UsersManager.#users.find(user => user.email === email)
      return userFound;
    } catch (error) {
      throw error;
    }
  };

  update = (id, data) => {
    try {
      const userToUpdate = this.readOne(id);
      Object.assign(userToUpdate, data);
      return userToUpdate;
    } catch (error) {
      console.log(error);
    }
  };

  destroy = (id) => {
    try {
      const findProductExists = this.readOne(id);
      UsersManager.#users = UsersManager.#users.filter(
        (product) => product.id !== findProductExists.id
      );
      console.log("User deleted:", findProductExists);
    } catch (error) {
      console.log(error);
    }
  };
}

const usersManager = new UsersManager();
export default usersManager;

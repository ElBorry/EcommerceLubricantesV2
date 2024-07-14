import crypto from "crypto";
class UserManager {
  static #users = [];
  //Method to create a user:
  async create(data) {
    try {
      // const one = {
      //   id: data.id || crypto.randomBytes(12).toString("hex"),
      //   photo: data.photo || "foto_default.jpg",
      //   email: data.email,
      //   password: data.password,
      //   role: data.role,
      // };
      // if (!data.email || !data.password) {
      //   throw new Error("User not created. Please enter email and password");
      // } else {
      //UserManager.#users.push(one);
      UserManager.#users.push(data);
      console.log("User created successfully");
      // }
      return data;
    } catch (error) {
      throw error;
    }
  }
  //Method to read user list by filter (role):
  async read(filter) {
    try {
      if (UserManager.#users.length === 0) {
        const error = new Error("NOT FOUND");
        error.statusCode = 404;
        throw error;
      } else {
        if (filter) {
          const all = UserManager.#users.filter((user) => user.role === filter);
          if (!all) {
            const error = new Error("NOT FOUND");
            error.statusCode = 404;
            throw error;
          }
          return all;
        } else {
          const all = UserManager.#users;
          return all;
        }
      }
    } catch (error) {
      throw error;
    }
  }
  //Method to find and read one User from the list:
  async readOne(id) {
    try {
      const one = UserManager.#users.find((user) => user._id === id);
      if (one !== undefined) {
        return one;
      } else {
        const error = new Error("NOT FOUND");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }

  //Method to find and read one User by its email from the list:
  async readByEmail(email) {
    try {
      const one = UserManager.#users.find((user) => user.email === email);
      if (one !== undefined) {
        return one;
      } else {
        const error = new Error("NOT FOUND");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }

  //Method to update a user by id
  async update(id, data) {
    try {
      let one = await this.readOne(id);
      if (!one) {
        const error = new Error("NOT FOUND");
        error.statusCode = 404;
        throw error;
      } else {
        for (let prop in data) {
          one[prop] = data[prop];
        }
        return one;
      }
    } catch (error) {
      throw error;
    }
  }

  //Method to delete a user by id:
  async destroy(id) {
    try {
      let one = await this.readOne(id);
      if (!one) {
        const error = new Error("NOT FOUND");
        error.statusCode = 404;
        throw error;
      } else {
        const newArray = UserManager.#users.filter((user) => user._id !== id);
        UserManager.#users = newArray;
        return one;
      }
    } catch (error) {
      throw error;
    }
  }
}

const userManager = new UserManager();
// await userManager.create({
//   photo: "foto_usr1.jpg",
//   email: "rodri_perez@gmail.com",
//   password: "RoDP#5870*!",
//   role: "Admin",
// });

// await userManager.create({
//   photo: "foto_usr2.jpg",
//   email: "matspind_45@gmail.com",
//   password: "654!La3p2L1*",
//   role: "Key User",
// });

// await userManager.create({
//   photo: "foto_usr3.jpg",
//   email: "maria@gmail.com",
//   password: "L#2vF6Qz@",
//   role: "Client",
// });

// await userManager.create({
//   id: "123456789",
//   photo: "foto_usr4.jpg",
//   email: "juan_carlos@yahoo.com",
//   password: "Gp5@jR9d!",
//   role: "Admin",
// });

// console.log("List of users:");
// console.log(await userManager.read());
// console.log("User found:");
// console.log(await userManager.readOne("123456789"));
// console.log("User deleted:");
// console.log(await userManager.destroy("123456789"));
// console.log("Updated list:");
// console.log(await userManager.read());

export default userManager;

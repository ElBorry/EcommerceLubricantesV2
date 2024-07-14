import fs from "fs";
class UserManager {
  constructor() {
    this.path = "./src/data/fs/files/users.json";
    this.init();
  }
  init() {
    const exists = fs.existsSync(this.path);
    if (!exists) {
      const stringData = JSON.stringify([], null, 2);
      fs.writeFileSync(this.path, stringData);
    }
  }

  async create(data) {
    try {
      // if (!data.email || !data.password) {
      //   throw new Error("User not created. Please enter email and password");
      // } else {
        // const data = {
        //   id: data.id || crypto.randomBytes(12).toString("hex"),
        //   photo:
        //     data.photo ||
        //     "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/user-avatar.svg/120px-user-avatar.svg.png?20201213175635",
        //   email: data.email,
        //   password: data.password,
        //   role: data.role || 0,
        // };

        let allUser = await fs.promises.readFile(this.path, "utf-8");
        allUser = JSON.parse(allUser);
        allUser.push(data);
        allUser = JSON.stringify(allUser, null, 2);
        await fs.promises.writeFile(this.path, allUser);
        console.log("User created successfully");
        return data;
      // }
    } catch (error) {
      throw error;
    }
  }

  async read(filter) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      filter && (all = all.filter((user) => user.role === filter));
      if (!all) {
        const error = new Error("NOT FOUND");
        error.statusCode = 404;
        throw error;
      }
      return all;
    } catch (error) {
      throw error;
    }
  }

  async readOne(id) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      let one = all.find((each) => each._id === id);
      if (!one) {
        const error = new Error("NOT FOUND");
        error.statusCode = 404;
        throw error;
      }
      return one;
    } catch (error) {
      throw error;
    }
  }
  
  async readByEmail(email) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      let one = all.find((each) => each.email === email);
      if (!one) {
        const error = new Error("NOT FOUND");
        error.statusCode = 404;
        throw error;
      }
      return one;
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      let all = await this.read();
      let one = all.find((each) => each._id === id);
      if (one) {
        for (let prop in data) {
          one[prop] = data[prop];
        }
        all = JSON.stringify(all, null, 2);
        await fs.promises.writeFile(this.path, all);
      } else {
        const error = new Error("NOT FOUND");
        error.statusCode = 404;
        throw error;
      }
      return one;
    } catch (error) {
      throw error;
    }
  }
  
  async destroy(id) {
    try {
      let one = await this.readOne(id);      
      if (!one) {
        const error = new Error("NOT FOUND");
        error.statusCode = 404;
        throw error;
      } else {
        let restOfUsers = await fs.promises.readFile(this.path, "utf-8");
        restOfUsers = JSON.parse(restOfUsers);
        restOfUsers = restOfUsers.filter((each) => each._id !== id);
        restOfUsers = JSON.stringify(restOfUsers, null, 2);
        await fs.promises.writeFile(this.path, restOfUsers);
        return one;
      }
    } catch (error) {
      throw error;
    }
  }
}

// async function test() {
//   try {
//     const oneUser = new UserManager();
//     await oneUser.create({
//       photo:
//         "https://media.licdn.com/dms/image/D4D03AQEQK2qc7xMh-A/profile-displayphoto-shrink_800_800/0/1675441404292?e=2147483647&v=beta&t=FXWVgkOoPkwsl6KKof6LMsi2laQ4U7JKNmRQSvZcNT0",
//       email: "rodri_perez@gmail.com",
//       password: "RoDP#5870*!",
//       role: "Admin",
//     });

//     await oneUser.create({
//       photo:
//         "https://superblog.supercdn.cloud/site_cuid_clilou76g4798113tmf1lw59vru/images/instagram-man-ideas-3-1687868963182-compressed.PNG",
//       email: "matspind_45@gmail.com",
//       password: "654!La3p2L1*",
//       role: "Key User",
//     });

//     await oneUser.create({
//       photo:
//         "https://writestylesonline.com/wp-content/uploads/2021/02/Michele-Round-Circle-2020.png",
//       email: "maria4587@gmail.com",
//       password: "L#2vF6Qz@",
//       role: "Client",
//     });

//     await oneUser.create({
//       id: "123456789",
//       photo:
//         "https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp",
//       email: "carla_pereyra@yahoo.com",
//       password: "Gp5@jR9d!",
//       role: "Admin",
//     });
//     // await oneUser.read();
//     // await oneUser.readOne("123456789");
//     // await oneUser.destroy("123456789");
//   } catch (error) {
//     throw error;
//   }
// }

//test();

const userManager = new UserManager();
export default userManager;

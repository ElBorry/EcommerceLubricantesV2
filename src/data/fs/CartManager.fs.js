import fs from "fs";
import crypto from "crypto";

class CartManager {
    constructor() {
        this.path = "./src/data/fs/files/carts.json";
        this.init();
    }
    //Method to create a new Carts file:
    init() {
        const exist = fs.existsSync(this.path);
        if (!exist) {
            const cartArray = JSON.stringify([], null, 2);
            fs.writeFileSync(this.path, cartArray);
            console.log("File created");
        } else {
            console.log("File already exists");
        }
    }
    //Method to create a new cart:
    async create(data) {
        try {
            // const data = {
            //   id: data.id || crypto.randomBytes(12).toString("hex"),
            //   user_id: data.user_id || crypto.randomBytes(12).toString("hex"),
            //   product_id: data.product_id || crypto.randomBytes(12).toString("hex"),
            //   quantity: data.quantity,
            //   state: data.state,
            // };
            let allcart = await fs.promises.readFile(this.path, "utf-8");
            allcart = JSON.parse(allcart);
            allcart.push(data);
            allcart = JSON.stringify(allcart, null, 2);
            await fs.promises.writeFile(this.path, allcart);
            console.log("cart created successfully");
            return data;
        } catch (error) {
            throw error;
        }
    }
    //Method to read Carts List from file - if filter is an argument then filter by user_id:
    async read(filter) {
        try {
            let all = await fs.promises.readFile(this.path, "utf-8");
            all = JSON.parse(all);
            filter && (all = all.filter((cart) => cart.user_id === filter));
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

    //Method to find a cart by id in the file:
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

    //Method to update a cart by id
    async update(id, cart) {
        try {
            let all = await this.read();
            let one = all.find((each) => each._id === id);
            if (one) {
                for (let prop in cart) {
                    one[prop] = cart[prop];
                }
                all = JSON.stringify(all, null, 2);
                await fs.promises.writeFile(this.path, all);
                console.log("cart updated: " + JSON.stringify(one, null, 2));
            } else {
                const error = new Error("NOT FOUND");
                error.StatusCode = 404;
                throw error;
            }
            return one;
        } catch (error) {
            throw error;
        }
    }

    //Method to destroy a cart in the file:
    async destroy(id) {
        try {
            let one = await this.readOne(id);
            if (!one) {
                const error = new Error("NOT FOUND");
                error.statusCode = 404;
                throw error;
            } else {
                let restOfCarts = await fs.promises.readFile(this.path, "utf-8");
                restOfCarts = JSON.parse(restOfCarts);
                restOfCarts = restOfCarts.filter((each) => each._id !== id);
                restOfCarts = JSON.stringify(restOfCarts, null, 2);
                await fs.promises.writeFile(this.path, restOfCarts);
                return one;
            }
        } catch (error) {
            throw error;
        }
    }
}

// async function test() {
//   try {
//     const cartManager = new CartManager();
//     await cartManager.create({
//       quantity: 1,
//       state: "reserved",
//     });

//     await cartManager.create({
//       quantity: 2,
//       state: "paid",
//     });

//     await cartManager.create({
//       quantity: 4,
//       state: "delivered",
//     });

//     await cartManager.create({
//       id: "0123456789101",
//       quantity: 10,
//       state: "reserved",
//     });
//     await cartManager.create({
//       state: "reserved",
//     });

//     await cartManager.read();
//     await cartManager.readOne("0123456789101");
//     await cartManager.update("0123456789101", {
//       quantity: 2,
//       state: "paid",
//     });
//     await cartManager.destroy("0123456789101");
//     await cartManager.readOne("0123456789101");
//   } catch (error) {
//     throw error;
//   }
// }

//test();

const cartManager = new CartManager();
export default cartManager;

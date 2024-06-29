import User from './models/user.model.js';
import Product from './models/product.model.js';
import Cart from './models/cart.model.js';
class Manager {
  constructor(Model) {
    this.Model = Model;
  }
  async create(data) {
    try {
      const one = await this.Model.create(data);
      return one;
    } catch (error) {
      throw error;
    }
  }

  async aggregate(obj) {
    try {
      const result = await this.Model.aggregate(obj);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async read(filter) {
    try {
      const all = await this.Model.find(filter).lean();
      return all;
    } catch (error) {
      throw error;
    }
  }

  async paginate({ filter, opts }) {
    try {
      const all = await this.Model.paginate(filter, opts);
      if (all.totalDocs === 0) {
        const error = new Error("There aren't any document");
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
      const one = await this.Model.findOne({ _id: id }).lean();
      return one;
    } catch (error) {
      throw error;
    }
  }
  async update(id, data) {
    try {
      const one = await this.Model.findByIdAndUpdate(id, data, { new: true });
      return one;
    } catch (error) {
      throw error;
    }
  }
  async destroy(id) {
    try {
      const one = await this.Model.findByIdAndDelete(id);
      return one;
    } catch (error) {
      throw error;
    }
  }

  async destroyAll(id) {
    try {
      const all = await this.Model.deleteMany({user_id: id}).lean();
      return all;
    } catch (error) {
      throw error;
    }
  }

  async readByEmail(email) {
    try {
      const one = await this.Model.findOne({ email });
      return one;
    } catch (error) {
      throw error;
    }
  }
}

const users = new Manager(User);
const products = new Manager(Product);
const carts = new Manager(Cart);

export { users, products, carts };
export default Manager;

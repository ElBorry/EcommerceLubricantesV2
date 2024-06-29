import CartsDTO from "../dto/carts.dto.js";
import dao from "../data/dao.factory.js"
const { carts } = dao;
class CartsRepository {
  constructor(manager) {
    this.model = manager;
  }
  createRepository = async (data) => {
    try {
      data = new CartsDTO(data);
      const one = await this.model.create(data);
      return one;
    } catch (error) {
      throw error;
    }
  };
  readRepository = async (filter) => {
    try {
      const all = await this.model.read(filter);
      return all;
    } catch (error) {
      throw error;
    }
  };
  readOneRepository = async (id) => {
    try {
      const one = await this.model.readOne(id);
      return one;
    } catch (error) {
      throw error;
    }
  };
  updateRepository = async (id, data) => {
    try {
      const one = await this.model.update(id, data);
      return one;
    } catch (error) {
      throw error;
    }
  };
  destroyRepository = async (id) => {
    try {
      const one = await this.model.destroy(id);
      return one;
    } catch (error) {
      throw error;
    }
  };
  destroyAllRepository = async (id) => {
    try {
      const all = await this.model.destroyAll(id);
      return all;
    } catch (error) {
      throw error;
    }
  };
  aggregateRepository = async (obj) => {
    try {
      const one = await this.model.aggregate(obj);
      return one;
    } catch (error) {
      throw error;
    }
  }
}

const cartsRepository = new CartsRepository(carts);
export default cartsRepository;

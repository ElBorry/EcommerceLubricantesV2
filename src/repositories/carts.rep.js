import dao from "../data/dao.factory.js";
const { products } = dao;
import ProductsDTO from "../dto/products.dto.js";
class ProductsRepository {
  constructor(manager) {
    this.model = manager;
  }
  createRepository = async (data) => {
    try {
      data = new ProductsDTO(data);
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
  paginateRepository = async ({ filter, opts }) => {
    try {
      const all = await this.model.paginate({ filter, opts });
      return all;
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
}

const productsRepository = new ProductsRepository(products);
export default productsRepository;
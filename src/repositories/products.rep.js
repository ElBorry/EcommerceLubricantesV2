//DAO - Assign corresponding manager
import dao from "../data/dao.factory.js";
import CreateProductsDto from "../dto/create/products.dto.create.js";
import UpdateProductsDto from "../dto/update/products.dto.update.js";

const { productsManager } = dao;

class ProductsRepository {
  constructor(manager) {
    this.manager = manager;
  }
  createRepository = async (data) => {
    try {
      data = new CreateProductsDto(data);
      const newItem = await this.manager.create(data);
      return newItem;
    } catch (error) {
      throw error;
    }
  };
  readRepository = async (filterInfo) => {
    try {
      const allData = await this.manager.read(filterInfo);
      return allData;
    } catch (error) {
      throw error;
    }
  };
  readOneRepository = async (uid) => {
    try {
      const itemInvidual = await this.manager.readOne(uid);
      return itemInvidual;
    } catch (error) {
      throw error;
    }
  };
  readByEmailRepository = async (email) => {
    try {
      const itemInvidual = await this.manager.readByEmail(email);
      return itemInvidual;
    } catch (error) {
      throw error;
    }
  };
  updateRepository = async (uid, data) => {
    try {
      data = new UpdateProductsDto(data);
      const itemUpdated = await this.manager.update(uid, data);
      return itemUpdated;
    } catch (error) {
      throw error;
    }
  };
  destroyRepository = async (uid) => {
    try {
      const itemDeleted = await this.manager.destroy(uid);
      return itemDeleted;
    } catch (error) {
      throw error;
    }
  };
  destroyAllRepository = async (uid) => {
    try {
      const itemsDeleted = await this.manager.destroyMany(uid);
      return itemsDeleted;
    } catch (error) {
      throw error;
    }
  };
  paginateRepository = async ({ filter, opts }) => {
    try {
      const allData = await this.manager.paginate({ filter, opts });
      return allData;
    } catch (error) {
      throw error;
    }
  };
  aggregateRepository = async (obj) => {
    try {
      const result = await this.manager.aggregate(obj);
      return result;
    } catch (error) {
      throw error;
    }
  };
}

const productsRepository = new ProductsRepository(productsManager);
export default productsRepository;

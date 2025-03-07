class Service {
  constructor(repository) {
    this.repository = repository;
  }
  createService = async (data) => {
    try {
      const newItem = await this.repository.createRepository(data);
      return newItem;
    } catch (error) {
      throw error;
    }
  };
  readService = async (filterInfo) => {
    try {
      const allData = await this.repository.readRepository(filterInfo);
      return allData;
    } catch (error) {
      throw error;
    }
  };
  readOneService = async (uid) => {
    try {
      const itemInvidual = await this.repository.readOneRepository(uid);
      return itemInvidual;
    } catch (error) {
      throw error;
    }
  };
  readByEmailService = async (email) => {
    try {
      const itemInvidual = await this.repository.readByEmailRepository(email);
      return itemInvidual;
    } catch (error) {
      throw error;
    }
  };
  updateService = async (uid, data) => {
    try {
      const itemUpdated = await this.repository.updateRepository(uid, data);
      return itemUpdated;
    } catch (error) {
      throw error;
    }
  };
  destroyService = async (uid) => {
    try {
      const itemDeleted = await this.repository.destroyRepository(uid);
      return itemDeleted;
    } catch (error) {
      throw error;
    }
  };
  destroyAllService = async (uid) => {
    try {
      const itemDeleted = await this.repository.destroyAllRepository(uid);
      return itemDeleted;
    } catch (error) {
      throw error;
    }
  };
  paginateService = async ({ filter, opts }) => {
    try {
      const allData = await this.repository.paginateRepository({
        filter,
        opts,
      });
      return allData;
    } catch (error) {
      throw error;
    }
  };
  aggregateService = async (obj) => {
    try {
      const result = await this.repository.aggregateRepository(obj);
      return result;
    } catch (error) {
      throw error;
    }
  };
}

export default Service;

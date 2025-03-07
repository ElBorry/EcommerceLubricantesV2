class Manager {
  constructor(Model) {
    this.Model = Model;
  }
  create = async (data) => {
    try {
      const newOne = await this.Model.create(data);
      return newOne;
    } catch (error) {
      throw error;
    }
  };
  read = async (filterInfo) => {
    try {
      const allData = await this.Model.find(filterInfo).lean();
      return allData;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  readOne = async (id) => {
    try {
      const itemInvidual = await this.Model.findById(id).lean();
      return itemInvidual;
    } catch (error) {
      throw error;
    }
  };
  readByEmail = async (email) => {
    try {
      const itemInvidual = await this.Model.findOne({ email }).lean();
      return itemInvidual;
    } catch (error) {
      throw error;
    }
  };
  update = async (id, data) => {
    try {
      //new:true return a object updated
      const itemUpdated = await this.Model.findByIdAndUpdate(id, data, {
        new: true,
      }).lean();
      return itemUpdated;
    } catch (error) {
      throw error;
    }
  };
  destroy = async (id) => {
    try {
      const itemDeleted = await this.Model.findByIdAndDelete(id);
      return itemDeleted;
    } catch (error) {
      throw error;
    }
  };
  destroyMany = async (id) => {
    try {
      const itemsDeleted = await this.Model.deleteMany({ user_id: id });
      return itemsDeleted;
    } catch (error) {
      throw error;
    }
  };
  paginate = async ({ filter, opts }) => {
    try {
      const allData = await this.Model.paginate(filter, opts);
      return allData;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  aggregate = async (obj) => {
    try {
      const result = await this.Model.aggregate(obj);
      return result;
    } catch (error) {
      throw error;
    }
  };
}

export default Manager;

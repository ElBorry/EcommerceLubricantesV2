import {
  createService,
  readOneService,
  readService,
  updateService,
  destroyService,
} from "../services/users.service.js";

//Create a new user
export const create = async (req, res, next) => {
  try {
    const data = req.body;
    const newUser = await createService(data);
    return newUser
      ? res.message201("User created successfully")
      : res.error404("Problems creating user");
  } catch (error) {
    return next(error);
  }
};

//Read <- get all users or get for role
export const read = async (req, res, next) => {
  try {
    const { role } = req.query;
    const users = await readService(role);
    return users.length > 0
      ? res.response200(users)
      : res.error404("Not found role/data!");
  } catch (error) {
    return next(error);
  }
};

//Read <- get user by ID
export const readOne = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const user = await readOneService(uid);
    return user
      ? res.response200(user)
      : res.error404("Not found user with that ID!");
  } catch (error) {
    return next(error);
  }
};

//Update a user
export const update = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const data = req.body;
    const updateUser = await updateService(uid, data);
    return updateUser
      ? res.response200(updateUser)
      : res.error404("Not found user with that ID to update!");
  } catch (error) {
    return next(error);
  }
};

export const destroy = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const deleteUser = await destroyService(uid);
    return deleteUser
      ? res.response200(deleteUser)
      : res.error404("Not found user with that ID to delete!");
  } catch (error) {
    return next(error);
  }
};

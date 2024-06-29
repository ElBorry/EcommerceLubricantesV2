import Manager from '../Manager.mongo.js';
import User from '../models/user.model.js';

const userManager = new Manager(User);

export default userManager;


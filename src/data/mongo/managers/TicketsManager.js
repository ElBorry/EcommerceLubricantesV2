import Ticket from "../models/ticket.model.js";
import Manager from "../Manager.mongo.js";

const ticketsManager = new Manager(Ticket);
export default ticketsManager;
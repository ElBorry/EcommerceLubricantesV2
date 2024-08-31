import { connect } from "mongoose";
import variablesEnviroment from "../env/env.util.js";

export const dbConnection = async () => {
  try {
    await connect(variablesEnviroment.MONGO_URI);
    console.log("Mongoose connection established!");
  } catch (error) {
    console.log(error);
  }
};

import __dirname from "../../../utils.js";

const swaggerOptions = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Shell Lubricenter",
      description: "Documentation of API",
    },
  },
  apis: [`${__dirname}/src/docs/*.yaml`],
};

export default swaggerOptions;

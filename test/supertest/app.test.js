import { expect } from "chai";
import supertest from "supertest";
import variablesEnviroment from "../../src/utils/env/env.util.js";
import { readByEmailService } from "../../src/services/auth.service.js";
import { readService } from "../../src/services/products.service.js";

const requester = supertest(`http://localhost:${variablesEnviroment.PORT}/api`);

describe("Testeando Lubricenter API", function () {
  this.timeout(20000);

  const newUser = {
    username: "camilo2023",
    email: "cami2023@hotmail.com",
    password: "hola1234",
    role: 1,
    verify: true,
  };
  const newProduct = {
    title: "Testing Nintendo",
    price: 1000,
    stock: 100,
    category: "NINTENDO",
    photo: "https://example.com/photo1.jpg",
  };
  const dataNewProduct = {
    price: 110,
  };
  let token = "";

  it("Registro de un usuario", async () => {
    const response = await requester.post("/auth/register").send(newUser);
    const { _body } = response;
    expect(_body.statusCode).to.be.equals(201);
  });

  it("Inicio de sesión de un usuario", async () => {
    const response = await requester.post("/auth/login").send(newUser);
    const { _body, headers } = response;
    token = headers["set-cookie"][0].split(";")[0];
    expect(_body.statusCode).to.be.equals(200);
  });

  it("Crear un nuevo producto", async () => {
    const response = await requester
      .post("/products/")
      .send(newProduct)
      .set("Cookie", token);
    const { _body } = response;
    expect(_body.statusCode).to.be.equals(201);
  });

  it("Crear un nuevo producto (Sin iniciar Sesión)", async () => {
    const response = await requester.post("/products/").send(newProduct);
    const { _body } = response;
    expect(_body.statusCode).to.be.equals(401);
  });

  it("Consultar todos los productos", async () => {
    const response = await requester.get("/products/paginate");
    const { _body } = response;
    expect(_body.statusCode).to.be.equals(200);
  });

  it("Consultar productos por categoria (NINTENDO,XBOX)", async () => {
    const category = "NINTENDO";
    const response = await requester.get(
      `/products/paginate?category=${category}`
    );
    const { _body } = response;
    expect(_body.statusCode).to.be.equals(200);
  });

  it("Consultar un producto por ID", async () => {
    const foundProduct = await readService({ title: newProduct.title });
    const response = await requester.get(`/products/${foundProduct[0]._id}`);
    const { _body } = response;
    expect(_body.statusCode).to.be.equals(200);
  });

  it("Actualizar un producto", async () => {
    const foundProduct = await readService({ title: newProduct.title });
    const response = await requester
      .put(`/products/${foundProduct[0]._id}`)
      .send(dataNewProduct)
      .set("Cookie", token);
    const { _body } = response;
    expect(_body.statusCode).to.be.equals(200);
  });

  it("Actualizar un producto (Sin iniciar Sesión)", async () => {
    const foundProduct = await readService({ title: newProduct.title });
    const response = await requester
      .put(`/products/${foundProduct[0]._id}`)
      .send(dataNewProduct);
    const { _body } = response;
    expect(_body.statusCode).to.be.equals(401);
  });

  it("Borrar un producto (Sin iniciar Sesión)", async () => {
    const foundProduct = await readService({ title: newProduct.title });
    const response = await requester.delete(`/products/${foundProduct[0]._id}`);
    const { _body } = response;
    expect(_body.statusCode).to.be.equals(401);
  });

  it("Borrar un producto", async () => {
    const foundProduct = await readService({ title: newProduct.title });
    const response = await requester
      .delete(`/products/${foundProduct[0]._id}`)
      .set("Cookie", token);
    const { _body } = response;
    expect(_body.statusCode).to.be.equals(200);
  });

  it("Cerrado de sesión", async () => {
    const response = await requester.post("/auth/signout").set("Cookie", token);
    const { _body } = response;
    expect(_body.statusCode).to.be.equals(200);
  });

  it("Eliminación de un usuario", async () => {
    const foundUser = await readByEmailService(newUser.email);
    const response = await requester.delete(`/auth/${foundUser._id}`);
    const { _body } = response;
    expect(_body.statusCode).to.be.equals(200);
  });
});

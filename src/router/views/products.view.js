import { Router } from "express";
//import productManager from "../../data/fs/ProductManager.fs.js";
//import productManager from "../../data/mongo/managers/ProductsManager.mongo.js";
import dao from "../../data/dao.factory.js"
const { products } = dao;

const productsRouter = Router();

productsRouter.get("/", async (req, res, next) => {
  try {
    // const products = await productManager.read();
    const products = await products.read();
    return res.render("products", { title: "PRODUCTS", products });
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/paginate", async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const response = await fetch(`http://localhost:8080/api/products/paginate?limit=${limit}&page=${page}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const retrieveData = await response.json();
    console.log(retrieveData.info)
    return res.render("index", { products: retrieveData.response, pagination: retrieveData.info.totalPage, limit: retrieveData.info.limit, nextPage: retrieveData.info.nextPage, prevPage: retrieveData.info.prevPage, url: '/products' });
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/real", async (req, res, next) => {
  try {
    return res.render("real", { title: "REAL" });
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    //const one = await productManager.readOne(pid);
    const one = await products.readOne(pid);
    return res.render("detail", { title: "DETAIL", one });
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/category/:category", async (req, res, next) => {
  try {
    const page = 1; 
    const limit = 10;
    const { category } = req.params;
    const resp = await fetch(`http://localhost:8080/api/products/paginate?limit=${limit}&page=${page}&category=${category}`)
    if (!resp.ok) {
      throw new Error('Failed to fetch data');
    }
    const retrieveData = await resp.json();
    console.log(retrieveData);
    return res.render("index", { products: retrieveData.response, pagination: retrieveData.info.totalPage, limit: retrieveData.info.limit, nextPage: retrieveData.info.nextPage, prevPage: retrieveData.info.prevPage, url: '/products' });
  } catch (error) {
    return next(error);
  }
})

export default productsRouter;

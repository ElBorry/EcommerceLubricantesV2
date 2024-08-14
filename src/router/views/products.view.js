import { Router } from "express";
import dao from "../../data/dao.factory.js";

const productsRouter = Router();
const { products: productsService } = dao;  // Renombramos para evitar conflicto de nombres

productsRouter.get("/", async (req, res, next) => {
  try {
    const allProducts = await productsService.read();
    return res.render("products", { title: "PRODUCTS", products: allProducts });
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/paginate", async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Valores por defecto para page y limit
    const retrieveData = await productsService.paginate({ limit, page });

    return res.render("index", {
      products: retrieveData.response,
      pagination: retrieveData.info.totalPage,
      limit: retrieveData.info.limit,
      nextPage: retrieveData.info.nextPage,
      prevPage: retrieveData.info.prevPage,
      url: '/products'
    });
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
    const oneProduct = await productsService.readOne(pid);
    return res.render("detail", { title: "DETAIL", one: oneProduct });
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/category/:category", async (req, res, next) => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 10 } = req.query; // Valores por defecto

    const resp = await fetch(`http://localhost:8080/api/products/paginate?limit=${limit}&page=${page}&category=${category}`);
    if (!resp.ok) {
      throw new Error('Failed to fetch data');
    }
    
    const retrieveData = await resp.json();
    console.log(retrieveData);

    return res.render("index", {
      products: retrieveData.response,
      pagination: retrieveData.info.totalPage,
      limit: retrieveData.info.limit,
      nextPage: retrieveData.info.nextPage,
      prevPage: retrieveData.info.prevPage,
      url: '/products'
    });
  } catch (error) {
    return next(error);
  }
});

export default productsRouter;

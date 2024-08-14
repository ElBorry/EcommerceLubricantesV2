import { Router } from "express";
import productsRouter from "./products.view.js";
import usersRouter from "./users.view.js";
import CustomRouter from "../CustomRouter.js";

const viewsRouter = Router();
export default class ViewsRouter extends CustomRouter {
  init() {
    this.router.use("/products", productsRouter);
    this.router.use("/users", usersRouter);
    this.read("/", ["PUBLIC"], async (req, res, next) => {
      try {
        const page = 1;
        const limit = 4;
        const response = await fetch(
          `http://localhost:8080/api/products/paginate?limit=${limit}&page=${page}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const retrieveData = await response.json();
        console.log(retrieveData.info);
        return res.render("index", {
          products: retrieveData.response,
          pagination: retrieveData.info.totalPage,
          limit: retrieveData.info.limit,
          nextPage: retrieveData.info.nextPage,
          prevPage: retrieveData.info.prevPage,
          url: "/products",
        });
      } catch (error) {
        return next(error);
      }
    });
    this.read("/chat", ["PUBLIC"], async (req, res, next) => {
      try {
        return res.render("chat", { title: "CHAT" });
      } catch (error) {
        return next(error);
      }
    });
  }
}

// viewsRouter.use("/products", productsRouter);
// viewsRouter.use("/users", usersRouter);

// viewsRouter.get("/", async (req, res, next) => {
//   try {
//     const page = 1;
//     const limit = 4;
//     const response = await fetch(
//       `http://localhost:8080/api/products/paginate?limit=${limit}&page=${page}`
//     );
//     if (!response.ok) {
//       throw new Error("Failed to fetch data");
//     }
//     const retrieveData = await response.json();
//     console.log(retrieveData.info);
//     return res.render("index", {
//       products: retrieveData.response,
//       pagination: retrieveData.info.totalPage,
//       limit: retrieveData.info.limit,
//       nextPage: retrieveData.info.nextPage,
//       prevPage: retrieveData.info.prevPage,
//       url: "/products",
//     });
//   } catch (error) {
//     return next(error);
//   }
// });

// viewsRouter.get("/chat", async (req, res, next) => {
//   try {
//     return res.render("chat", { title: "CHAT" });
//   } catch (error) {
//     return next(error);
//   }
// });

// export default viewsRouter;

function isTitle(req, res, next) {
  try {
    const { title, category } = req.body;
    if (!title) {
      const err = new Error("Insert title!");
      err.statusCode = 400;
      throw err;
    }

    if (!category) {
      req.body.category = "Varios";
    }

    return next();
    //el next solo me deja pasar hacia la funcion siguiente
  } catch (error) {
    return next(error);
    //el next con ERROR me deja pasar hacia el error handler
  }
}

export default isTitle;

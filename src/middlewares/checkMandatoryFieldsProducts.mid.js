export const checkMandatoryFieldsProducts = (req, res, next) => {

    const data = req.body;
    const title = data.title;

    if (!title) {
        const error = new Error("Missing required field title");
        error.statusCode = 400;
        throw error;
    }
    next();
}
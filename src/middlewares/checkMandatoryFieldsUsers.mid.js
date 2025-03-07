export const checkMandatoryFieldsUsers = (req, res, next) => {

    const { email, password } = req.body;

    if (!email || !password) {
        const error = new Error("Missing required fields email or password, check");
        error.statusCode = 400;
        throw error;
    }
    next();
}


class SessionController {
  register = async (req, res, next) => {
    try {
      res.message201("Registered!");
    } catch (error) {
      return next(error);
    }
  };

  google = async (req, res, next) => {
    try {
      return res.redirect("/?success=true");
    } catch (error) {
      return next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      return res.cookie("token", req.user.token, { signedCookie: true }).json({
        statusCode: 200,
        message: "Logged in!",
        token: req.user.token,
      });
    } catch (error) {
      return next(error);
    }
  };

  online = async (req, res, next) => {
    try {
      if (req.user.online || req.session.online) {
        return res.response200(req.user);
      }
      return res.error401();
    } catch (error) {
      return next(error);
    }
  };

  signout = async (req, res, next) => {
    try {
      if (req.user) {
        return res.clearCookie("token").message200("Signed out!");
      }
      return res.error401();
    } catch (error) {
      return next(error);
    }
  };
}

const sessionController = new SessionController();
export default sessionController;
export const { register, google, login, online, signout } = sessionController;

import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { Strategy as JWT_SECRET, ExtractJwt } from "passport-jwt";
import userManager from "../data/mongo/managers/UsersManager.mongo.js";
import { createHash, verifyHash } from "../utils/hash.util.js";
import { createToken } from "../utils/token.util.js";

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        if (!email || !password) {
          const error = new Error("Please enter a valid email and password!");
          error.statusCode = 400;
          return done(null, null, error);
        }
        console.log("Checking if email exists:", email);
        const one = await userManager.readByEmail(email);
        if (one) {
          const error = new Error("Email already registered!");
          error.statusCode = 401;
          return done(error);
        }
        const hashPassword = createHash(password);
        req.body.password = hashPassword;
        console.log("Creating new user with data:", req.body);
        const user = await userManager.create(req.body);
        return done(null, user);
      } catch (error) {
        console.error("Error during registration:", error);
        return done(error);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        console.log("Attempting to login with email:", email);
        const one = await userManager.readByEmail(email);
        if (!one) {
          const error = new Error("Email not registered!");
          error.statusCode = 401;
          return done(null, false, error);
        }
        const verify = verifyHash(password, one.password);
        if (verify) {
          const user = {
            email,
            role: one.role,
            photo: one.photo,
            _id: one._id,
            online: true,
          };
          const token = createToken(user);
          user.token = token;
          console.log("User login successful:", user);
          return done(null, user);
        }
        const error = new Error("Invalid Credentials!");
        error.statusCode = 401;
        return done(null, false, error);
      } catch (error) {
        console.error("Error during login:", error);
        return done(error);
      }
    }
  )
);

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/api/sessions/google/callback",
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const { id, picture } = profile;
        let user = await userManager.readByEmail(id);
        if (!user) {
          user = {
            email: id,
            photo: picture,
            password: createHash(id),
          };
          user = await userManager.create(user);
        }
        req.session.email = user.email;
        req.session.online = true;
        req.session.role = user.role;
        req.session.photo = user.photo;
        req.session.user_id = user._id;
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "jwt",
  new JWT_SECRET(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies["token"],
      ]),
      secretOrKey: process.env.JWT_SECRET,
    },
    (data, done) => {
      try {
        if (data) {
          return done(null, data);
        } else {
          const error = new Error("Forbidden from jwt!");
          error.statusCode = 403;
          return done(error);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;

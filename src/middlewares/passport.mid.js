import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import crypto from "crypto";
import { verifyPassword } from "../utils/hashPassword/hashPassword.js";
import { createToken } from "../utils/token/token.util.js";
import variablesEnviroment from "../utils/env/env.util.js";
import authRepository from "../repositories/auth.rep.js";
import sendEmailLogin from "../utils/mail/mailingLogin.util.js";
import CustomError from "../utils/errors/CustomError.js";
import errors from "../utils/errors/erros.dictionary.js";

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const checkUSer = await authRepository.readByEmailRepository(email);
        if (checkUSer) {
          const error = CustomError.new(errors.invalid);
          return done(error);
        }
        const newUser = await authRepository.createRepository(req.body);
        return done(null, newUser);
      } catch (error) {
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
        let user = await authRepository.readByEmailRepository(email);
        if (!user) {
          const error = CustomError.new(errors.auth);
          return done(error);
        }
        const verify = verifyPassword(password, user.password);
        if (!verify || !user.verify) {
          const error = CustomError.new(errors.invalid);
          return done(error);
        }
        const codeOnline = crypto.randomBytes(3).toString("hex");
        user = await authRepository.updateRepository(user._id, {
          code: codeOnline,
        });
        await sendEmailLogin({
          email: user.email,
          name: user.username,
          code: user.code,
        });

        // Protect user password!!
        delete user.password;
        const token = createToken(user);
        req.token = token;
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "jwt",
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies["token"],
      ]),
      secretOrKey: variablesEnviroment.SECRET_JWT,
    },
    (data, done) => {
      try {
        if (data) {
          return done(null, data);
        } else {
          const error = CustomError.new(errors.jwterror);
          return done(error);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
import { genSaltSync, hashSync, compareSync } from "bcrypt";

export const createHash = (password) => {
  const salt = genSaltSync(10);
  const hashPasword = hashSync(password, salt);
  return hashPasword;
};

export const verifyPassword = (reqPass, dbPass) => {
  const isValid = compareSync(reqPass, dbPass);
  return isValid;
};

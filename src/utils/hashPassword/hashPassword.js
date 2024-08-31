import { genSaltSync, hashSync, compareSync } from "bcrypt";

export const createHash = (password) => {
  const salt = genSaltSync(10);
  const hashPasword = hashSync(password, salt);
  return hashPasword;
};

//export const verifyPassword = (reqPass, dbPass) => {
//  const isValid = compareSync(reqPass, dbPass);
//  return isValid;
//};
export const verifyPassword = (reqPass, dbPass) => {
  console.log("Comparing passwords:", reqPass, dbPass); // Agrega este log para verificar las contraseñas
  const isValid = compareSync(reqPass, dbPass);
  console.log("Password verification result:", isValid); // Resultado de la verificación
  return isValid;
};
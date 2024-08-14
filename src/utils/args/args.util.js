//import { Command } from "commander";

//const args = new Command();

//args
//  .option("-p <port>", "port", 8080) //Port
//  .option("--env <env>", "environment", "prod") //Environment
//  .option("--persistence <pers>", "persistence", "mongo"); //Persistence

//args.parse(); //para cerrar la configuración de comandos
//export default args.opts(); //para exportar los argumentos CLI

import { Command } from "commander";

const args = new Command();

args
  .option("-p <port>", "port", 8080) // Port
  .option("--env <env>", "environment", "prod") // Environment
  .option("--persistence <pers>", "persistence", "mongo"); // Persistence

args.parse(); // para cerrar la configuración de comandos

const options = args.opts();
console.log("Parsed Arguments:", options); // <-- Añadir esta línea

export default options; // para exportar los argumentos CLI

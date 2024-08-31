import { Command } from "commander";

const args = new Command();

args
  .option("-p <port>", "port", 8080) //Port
  .option("--env <env>", "environment", "prod") //Environment
  .option("--persistence <pers>", "persistence", "mongo"); //Persistence

args.parse(); //para cerrar la configuración de comandos
export default args.opts(); //para exportar los argumentos CLI

import express, { Response } from "express";
import router from "./Routes";
import "reflect-metadata";
import { appDataSource } from "./config/dataSource";

const app = express();
app.use(express.json());
router(app);

appDataSource.initialize()
  .then(() => {
    console.log("Banco de dados conectado")
  })
  .catch((erro) => {
    console.log(erro);
  }); 

export default app;

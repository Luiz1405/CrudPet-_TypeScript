import "express-async-errors";
import express, { Response } from "express";
import router from "./Routes";
import "reflect-metadata";
import { appDataSource } from "./config/dataSource";
import { erroMiddleWare } from "./middleware/erro";

const app = express();
app.use(express.json());
router(app);

app.use(erroMiddleWare);

appDataSource.initialize()
  .then(() => {
    console.log("Banco de dados conectado")
  })
  .catch((erro) => {
    console.log(erro);
  }); 

export default app;

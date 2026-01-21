import express from "express";
import { appDataSource } from "../config/dataSource";
import AbrigoRepository from "../repositories/AbrigoRepository";
import AbrigoService from "../Service/AbrigoService";
import AbrigoController from "../Controller/AbrigoController";


const router = express.Router();
const abrigoRepository = new AbrigoRepository(appDataSource.getRepository("AdotanteEntity"));

const abrigoService = new AbrigoService(abrigoRepository);

const abrigoController = new AbrigoController(abrigoService);

router.post("/", (req,res) => abrigoController.criaAbrigo(req,res));

router.get("/" , (req,res) => abrigoController.listaAbrigo(req,res) )

router.put("/:id" , (req,res) => abrigoController.atualizaAbrigo(req,res) )

router.delete("/:id" , (req,res) => abrigoController.deletaAbrigo(req,res) )

export default router;
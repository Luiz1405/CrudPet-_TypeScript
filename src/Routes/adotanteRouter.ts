import express from "express";
import { appDataSource } from "../config/dataSource";
import AdotanteController from "../Controller/AdotanteController";
import AdotanteRepository from "../repositories/AdotanteRepository";
import { middlewareValidadorBodyAdotante } from "../middleware/validadores/adotanteRequestBody";
import { RequestHandler } from "express-serve-static-core";
import { middlewareValidadorBodyEndereco } from "../middleware/validadores/enderecoRequestBody";
import { verificaIdMiddleWare } from "../middleware/verificaId";

const router = express.Router();
const adotanteRepository = new AdotanteRepository(appDataSource.getRepository("AdotanteEntity"))

const adotanteController = new AdotanteController(adotanteRepository);

const validateBodyAdotante:RequestHandler = (req,res,next) => middlewareValidadorBodyAdotante(req,res,next);

const validateBodyEndereco:RequestHandler = (req,res,next) => middlewareValidadorBodyEndereco(req,res,next);

router.post("/", validateBodyAdotante, (req,res) => adotanteController.criaAdotante(req,res));

router.get("/" , (req,res) => adotanteController.listaAdotante(req,res) )

router.put("/:id" ,verificaIdMiddleWare,  (req,res) => adotanteController.atualizaAdotante(req,res) )

router.delete("/:id" ,verificaIdMiddleWare, (req,res) => adotanteController.deletaAdotante(req,res) )

router.patch("/:id", validateBodyEndereco,verificaIdMiddleWare,  (req,res) => adotanteController.atualizaEnderecoAdotante(req,res) )

export default router;
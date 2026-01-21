import express, { RequestHandler } from "express";
import PetController from "../Controller/PetController";
import PetRepository from "../repositories/PetRepository";
import { appDataSource } from "../config/dataSource";
import { middlewareValidadorBodyPet } from "../middleware/validadores/petRequestBody copy";

const router = express.Router();

const petRepository = new PetRepository(
    appDataSource.getRepository("PetEntity"),
    appDataSource.getRepository("AdotanteEntity")
);

const validateBodyEndereco:RequestHandler = (req,res,next) => middlewareValidadorBodyPet(req,res,next);

const petController = new PetController(petRepository);

router.post("/", validateBodyEndereco ,(req, res) =>  petController.criaPet(req, res));

router.get("/",(req, res) =>  petController.listaPet(req, res));

router.patch("/:id",(req, res) =>  petController.atualizaPet(req, res));

router.delete("/:id",(req, res) => petController.deletaPet(req, res))

router.put("/:pet_id/:adotante_id",(req, res) => petController.adotaPet(req, res))

router.get("/filtroPorte",(req, res) =>  petController.buscaPetPeloPorte(req, res));

router.get("/filtro",(req, res) =>  petController.buscaPetPorCampoGenerico(req, res));

export default router;
import { Request, Response } from "express";
import CriaAbrigoDTO from "../DTO/CriaAbrigoDTO";
import AbrigoService from "../Service/AbrigoService";
import AbrigoEntity from "../entities/AbrigoEntity";


export default class AbrigoController {
    constructor(private abrigoService: AbrigoService){}

    async criaAbrigo(req: Request, res: Response) {
        const { nome, email, senha, celular, endereco } = req.body as CriaAbrigoDTO;
        const dadosAbrigo = { nome, email, senha, celular, endereco };

        const novoAbrigo = await this.abrigoService.criarAbrigo(dadosAbrigo);

        return res.status(201).json(novoAbrigo);
    }

    async listaAbrigo(req: Request, res: Response) {
        const abrigos = await this.abrigoService.listaAbrigos();

        return res.status(201).json(abrigos);
    }

    async atualizaAbrigo(req: Request, res:Response) {
        const { id } = req.params;
        const { success, message} = await this.abrigoService.atualizaAbrigo(
            Number(id),
            req.body as AbrigoEntity
        );

        if(!success) {
            return res.status(404).json({ message });
        }

        return res.status(201).json({ message });
    }

    async deletaAbrigo(req:Request, res:Response) {
        const { id } = req.params;
         const { success, message} = await this.abrigoService.deletaAbrigo(
            Number(id),
        );

         if(!success) {
            return res.status(404).json({ message });
        }

        return res.status(201).json({ message });
    }
    
}
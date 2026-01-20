import { Request, Response } from "express";
import AdontanteEntity from "../entities/AdotanteEntity";
import AdotanteRepository from "../repositories/AdotanteRepository";
import AdotanteEntity from "../entities/AdotanteEntity";
import EnderecoEntity from "../entities/EnderecoEntity";

export default class AdotanteController {
    constructor(private repository: AdotanteRepository) {}

    async criaAdotante(req: Request, res: Response) {
        const { nome, celular, endereco, foto, senha } = <AdontanteEntity>req.body;

        const novoAdotante = new AdontanteEntity(
            nome,
            senha,
            celular,
            foto,
            endereco
        );

        await this.repository.criaAdotante(novoAdotante);
        return res.status(201).json(novoAdotante);
    }

    async listaAdotante(req:Request, res: Response) {
        const adotantes = await this.repository.listaAdotantes();

        return res.status(201).json(adotantes);
    }

    async atualizaAdotante(req: Request, res:Response) {
        const { id } = req.params;
        const { success, message} = await this.repository.atualizaAdotante(
            Number(id),
            req.body as AdotanteEntity
        );

        if(!success) {
            return res.status(404).json({ message });
        }

        return res.status(201).json({ message });
    }

    async deletaAdotante(req: Request, res:Response) {
        const { id } = req.params;

        const { success, message } = await this.repository.deletaAdotante(
            Number(id)
        );

        if(!success) {
            return res.status(404).json({ message })
        }

        return res.status(200).json( { message })
    }

       async atualizaEnderecoAdotante(req: Request, res:Response) {
            const { id } = req.params;
    
            const { success, message } = await this.repository.atualizaEnderecoAdotante(
                Number(id),
                req.body as EnderecoEntity
            );
    
            if(!success) {
                return res.status(404).json({ message })
            }
    
            return res.status(200).json( { message })
        }
}
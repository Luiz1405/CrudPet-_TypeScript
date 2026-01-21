import { Request, Response } from "express";
import AdontanteEntity from "../entities/AdotanteEntity";
import AdotanteRepository from "../repositories/AdotanteRepository";
import AdotanteEntity from "../entities/AdotanteEntity";
import EnderecoEntity from "../entities/EnderecoEntity";
import { TipoRequestParamsBodyAdotante, TipoRequestBodyAdotante, TipoResponseBodyAdotante } from "../Tipos/tiposAdotante";


export default class AdotanteController {
    constructor(private repository: AdotanteRepository) {}

    async criaAdotante(
        req: Request<TipoRequestParamsBodyAdotante, {}, TipoRequestBodyAdotante>, 
        res: Response<TipoResponseBodyAdotante>
    ) {
        const { nome, celular, endereco, foto, senha } = <AdontanteEntity>req.body;
        
        const novoAdotante = new AdontanteEntity(
            nome,
            senha,
            celular,
            foto,
            endereco
        );

        await this.repository.criaAdotante(novoAdotante);
        return res.status(201).json({data:{ id:novoAdotante.id, nome,celular, endereco}});
    }

    async listaAdotante(
        req: Request<TipoRequestParamsBodyAdotante, {}, TipoRequestBodyAdotante>, 
        res: Response<TipoResponseBodyAdotante>
    ) {
        const listaDeAdotantes = await this.repository.listaAdotantes();
        const data = listaDeAdotantes.map((adotante)=>{
            return {
                id: adotante.id,
                nome:adotante.nome,
                celular:adotante.celular,
                endereco:adotante.endereco!==null ? adotante.endereco:undefined
            }
        })

        return res.status(201).json({data: data});
    }

    async atualizaAdotante(
        req: Request<TipoRequestParamsBodyAdotante, {}, TipoRequestBodyAdotante>, 
        res: Response<TipoResponseBodyAdotante>
    ) {
        const { id } = req.params;
        const { success, message} = await this.repository.atualizaAdotante(
            Number(id),
            req.body as AdotanteEntity
        );

        if(!success) {
            return res.status(404).json({ error: message });
        }

        return res.status(201);
    }

    async deletaAdotante(
        req: Request<TipoRequestParamsBodyAdotante, {}, TipoRequestBodyAdotante>, 
        res: Response<TipoResponseBodyAdotante>
    ) {
        const { id } = req.params;

        const { success, message } = await this.repository.deletaAdotante(
            Number(id)
        );

        if(!success) {
            return res.status(404).json({ error: message });
        }

        return res.status(200);
    }

       async atualizaEnderecoAdotante(
        req: Request<TipoRequestParamsBodyAdotante, {}, EnderecoEntity>, 
        res: Response<TipoResponseBodyAdotante>
    ) {
            const { id } = req.params;
    
            const { success, message } = await this.repository.atualizaEnderecoAdotante(
                Number(id),
                req.body
            );
    
            if(!success) {
                return res.status(404).json({ error: message });
            }
    
            return res.status(200);
        }
}
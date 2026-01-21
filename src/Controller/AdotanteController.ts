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
        await this.repository.atualizaAdotante(
            Number(id),
            req.body as AdotanteEntity
        );

        return res.status(201);
    }

    async deletaAdotante(
        req: Request<TipoRequestParamsBodyAdotante, {}, TipoRequestBodyAdotante>, 
        res: Response<TipoResponseBodyAdotante>
    ) {
        const { id } = req.params;

        await this.repository.deletaAdotante(
            Number(id)
        );

        return res.status(200);
    }

       async atualizaEnderecoAdotante(
        req: Request<TipoRequestParamsBodyAdotante, {}, EnderecoEntity>, 
        res: Response<TipoResponseBodyAdotante>
    ) {

        const { id } = req.params;

        await this.repository.atualizaEnderecoAdotante(
            Number(id),
            req.body
        );

        return res.status(200);
    }
}
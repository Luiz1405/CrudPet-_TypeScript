import { Request, Response } from "express";
import CriaAbrigoDTO from "../DTO/CriaAbrigoDTO";
import AbrigoService from "../Service/AbrigoService";
import AbrigoEntity from "../entities/AbrigoEntity";
import { TipoRequestBodyAbrigo, TipoRequestParamsAbrigo, TipoResponseBodyAbrigo } from "../Tipos/tiposAbrigo";
import { EnumHttpStatusCode } from "../Tipos/EnumHttpStatusCode";
import EnderecoEntity from "../entities/EnderecoEntity";


export default class AbrigoController {
    constructor(private abrigoService: AbrigoService){}

    async criaAbrigo(req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>,res: Response<TipoResponseBodyAbrigo>) {
        const { nome, email, senha, celular, endereco } = req.body as CriaAbrigoDTO;
        const dadosAbrigo = { nome, email, senha, celular, endereco };

        const novoAbrigo = await this.abrigoService.criarAbrigo(dadosAbrigo);

        return res.status(201).json({data: {id: novoAbrigo.id, nome, email, celular, endereco }});
    }

    async listaAbrigo(req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>,res: Response<TipoResponseBodyAbrigo>) {
        const abrigos = await this.abrigoService.listaAbrigos();

        return res.status(201).json({data: abrigos});
    }

    async atualizaAbrigo(req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>, res:Response<TipoResponseBodyAbrigo>) {
        const { id } = req.params;
        const { success, message} = await this.abrigoService.atualizaAbrigo(
            Number(id),
            req.body as AbrigoEntity
        );

        return res.sendStatus(EnumHttpStatusCode.NO_CONTENT);
    }

    async deletaAbrigo(req:Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>, res:Response<TipoResponseBodyAbrigo>) {
        const { id } = req.params;
         const { success, message} = await this.abrigoService.deletaAbrigo(
            Number(id),
        );

        return res.sendStatus(EnumHttpStatusCode.NO_CONTENT);
    }

    async atualizaEnderecoAbrigo(req:Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>, res:Response<TipoResponseBodyAbrigo>) {
        const { id } = req.params;
        const { endereco } = req.body;

        await this.abrigoService.atualizaEnderecoAbrigo(
            Number(id),
            endereco as EnderecoEntity
        )

        return res.sendStatus(EnumHttpStatusCode.OK);
    }
    
}
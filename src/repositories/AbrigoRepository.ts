import { Repository } from "typeorm";
import InterfaceAbrigoRepository from "./Contracts/InterfaceAbrigoRepository";
import AbrigoEntity from "../entities/AbrigoEntity";
import { NaoEncontrado, RequisicaoRuim } from "../utils/manipulaErros";
import EnderecoEntity from "../entities/EnderecoEntity";


export default class AbrigoRepository implements InterfaceAbrigoRepository {
    constructor(private abrigoRepository: Repository<AbrigoEntity>){}

    private async existeAbrigoComEsteCelular(celular: string): Promise<boolean> {
        return !!(await this.abrigoRepository.findOne({ where: { celular }}))
    }

    private async existeAbrigoComEsteEmail(email: string): Promise<boolean> {
        return !!(await this.abrigoRepository.findOne({ where: { email }}))
    }

    async criaAbrigo(abrigo: AbrigoEntity): Promise<void> {
        if(await this.existeAbrigoComEsteCelular(abrigo.celular) || await this.existeAbrigoComEsteEmail(abrigo.email) ) {
            throw new RequisicaoRuim("Já existe um abrigo com esse email!");
        }
        await this.abrigoRepository.save(abrigo);
    }

    async listaAbrigo(): Promise<AbrigoEntity[]> {
        return await this.abrigoRepository.find()
    }

    async atualizaAbrigo(abrigoId: number, newData: Partial<AbrigoEntity>): Promise<{ success: boolean; message: string; }> {
        const abrigoToUpdate = await this.abrigoRepository.findOne({ where: { id: abrigoId }});

        if(!abrigoToUpdate) {
            throw new NaoEncontrado ("Abrigo não encontrado!");
        };

        Object.assign(abrigoToUpdate, newData);

        await this.abrigoRepository.save(abrigoToUpdate);

        return {success: true, message: "Dados do abrigo atualizados com sucesso"};
    }

    async deletaAbrigo(abrigoId: number): Promise<{ success: boolean; message: string; }> {
        const abrigoToDelete = await this.abrigoRepository.findOne({where: {id: abrigoId}});

        if(!abrigoToDelete) {
            throw new NaoEncontrado ("Abrigo não encontrado!");
        }

        await this.abrigoRepository.delete(abrigoToDelete);

        return {success: true, message: "Abrigo deletado com sucesso!"}
    }

    async atualizaEnderecoAbrigo(idAbrigo: number, endereco: EnderecoEntity): Promise<void> {
        const abrigo = await this.abrigoRepository.findOne({ where: { id:idAbrigo}});

        if(!abrigo) {
            throw new NaoEncontrado("Abrigo não encontrado");
        }

        const novoEndereco = new EnderecoEntity(endereco.cidade, endereco.estado);
        abrigo.endereco = novoEndereco;

        await this.abrigoRepository.save(abrigo);
        
    }

}
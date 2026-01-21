import { Repository } from "typeorm";
import AdontanteEntity from "../entities/AdotanteEntity";
import InterfaceAdoranteRepository from "../repositories/Contracts/interfaceAdotanteRepository";
import EnderecoEntity from "../entities/EnderecoEntity";
import { NaoEncontrado, RequisicaoRuim } from "../utils/manipulaErros";

export default class AdotanteRepository implements InterfaceAdoranteRepository {

    constructor(private repository: Repository<AdontanteEntity>) {}

    private async celularNaoExisteNaBase(celular:string) {
        return await this.repository.findOne({where: {celular}});
    }

    async criaAdotante(adotante: AdontanteEntity): Promise<void> {
        if(await this.celularNaoExisteNaBase(adotante.celular)) {
            throw new RequisicaoRuim("Celular já cadastrado");
        }
        this.repository.save(adotante);
    }

    async listaAdotantes(): Promise<AdontanteEntity[]> {
        return await this.repository.find();
    }

    async atualizaAdotante(id: number, newData: AdontanteEntity): Promise<{ success: boolean; message?: string; }>{
        const adotanteToUpdate = await this.repository.findOne({ where: { id }});

        if(!adotanteToUpdate) {
            throw new NaoEncontrado("Adotante não encontrado");
        }

        Object.assign(adotanteToUpdate, newData);

        await this.repository.save(adotanteToUpdate);

        return { success: true, message: "Dados do adotante atualizados com sucesso"}; 
    }

    async deletaAdotante(id: number): Promise<{ success: boolean; message?: string; }>{
            const adotanteToDelete = await this.repository.findOne({ where: { id }})

            if(!adotanteToDelete) {
                throw new NaoEncontrado("Adotante não encontrado");
            }

            await this.repository.delete(adotanteToDelete);

            return { success: true, message: "Adotante excluído com sucesso."};
    }

    async atualizaEnderecoAdotante(idAdotante: number, endereco: EnderecoEntity): Promise<{ success: boolean; message?: string; }> {
        const adotante = await this.repository.findOne({ where: { id: idAdotante }});

        if(!adotante) {
            throw new NaoEncontrado("Adotante não encontrado");
        }

        const novoEndereco = new EnderecoEntity(endereco.cidade, endereco.estado);
        adotante.endereco = novoEndereco;

        await this.repository.save(adotante);
        return { success: true, message: "Endereço atualizado com sucesso"};
    }
} 
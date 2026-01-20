import { Repository } from "typeorm";
import AdontanteEntity from "../entities/AdotanteEntity";
import InterfaceAdoranteRepository from "../repositories/Contracts/interfaceAdotanteRepository";
import EnderecoEntity from "../entities/EnderecoEntity";

export default class AdotanteRepository implements InterfaceAdoranteRepository {

    constructor(private repository: Repository<AdontanteEntity>) {}

    criaAdotante(adotante: AdontanteEntity): void | Promise<void> {
        this.repository.save(adotante);
    }

    async listaAdotantes(): Promise<AdontanteEntity[]> {
        return await this.repository.find();
    }

    async atualizaAdotante(id: number, newData: AdontanteEntity): Promise<{ success: boolean; message?: string; }>{
        try{
            const adotanteToUpdate = await this.repository.findOne({ where: { id }});

            if(!adotanteToUpdate) {
                return { success: false, message: "Adotante não encontrado"};
            }

            Object.assign(adotanteToUpdate, newData);

            await this.repository.save(adotanteToUpdate);

            return { success: true, message: "Dados do adotante atualizados com sucesso"}; 

        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: "Ocorreu um erro ao tentar atualizar o adotante.",
            };
        }
    }

    async deletaAdotante(id: number): Promise<{ success: boolean; message?: string; }>{
        try{
            const adotanteToDelete = await this.repository.findOne({ where: { id }})

            if(!adotanteToDelete) {
                return { success: false, message: "Adotante não encontrado"};
            }

            await this.repository.delete(adotanteToDelete);

            return { success: true, message: "Adotante excluído com sucesso."};
            
        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: "Ocorreu um erro ao tentar excluír o adotante."
            }
        }
    }

    async atualizaEnderecoAdotante(idAdotante: number, endereco: EnderecoEntity): Promise<{ success: boolean; message?: string; }> {
        const adotante = await this.repository.findOne({ where: { id: idAdotante }});

        if(!adotante) {
            return { success: false, message: "Adotante não encontrado"};
        }

        const novoEndereco = new EnderecoEntity(endereco.cidade, endereco.estado);
        adotante.endereco = novoEndereco;

        await this.repository.save(adotante);
        return { success: true, message: "Endereço atualizado com sucesso"};
    }
} 
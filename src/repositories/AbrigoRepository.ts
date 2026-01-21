import { Repository } from "typeorm";
import InterfaceAbrigoRepository from "./Contracts/InterfaceAbrigoRepository";
import AbrigoEntity from "../entities/AbrigoEntity";


export default class AbrigoRepository implements InterfaceAbrigoRepository {
    constructor(private abrigoRepository: Repository<AbrigoEntity>){}

    criaAbrigo(abrigo: AbrigoEntity): void | Promise<void> {
        this.abrigoRepository.save(abrigo);
    }

    async listaAbrigo(): Promise<AbrigoEntity[]> {
        return await this.abrigoRepository.find()
    }

    async atualizaAbrigo(abrigoId: number, newData: Partial<AbrigoEntity>): Promise<{ success: boolean; message: string; }> {
        try {
            const abrigoToUpdate = await this.abrigoRepository.findOne({ where: { id: abrigoId }});

            if(!abrigoToUpdate) {
                return {success: false, message: "Abrigo não encontrado!"}
            };

            Object.assign(abrigoToUpdate, newData);

            await this.abrigoRepository.save(abrigoToUpdate);

            return {success: true, message: "Dados do abrigo atualizados com sucesso"};
        } catch (error) {
            console.log(error)
            return {
                success: false,
                message: "Ocorrou um erro ao tentar atualizar os dados do abrigo."
            }
        }
        
    }

    async deletaAbrigo(abrigoId: number): Promise<{ success: boolean; message: string; }> {
        try{

            const abrigoToDelete = await this.abrigoRepository.findOne({where: {id: abrigoId}});

            if(!abrigoToDelete) {
                return {success:false, message: "Abrigo não encontrado!"};
            }

            await this.abrigoRepository.delete(abrigoToDelete);

            return {success: true, message: "Abrigo deletado com sucesso!"}
        } catch(error) {
            console.log(error);
            return {
                success: false,
                message: "Ocorreu um erro ao deletar os dados do abrigo."
            };
        }
          
    }
}
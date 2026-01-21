import CriaAdotanteDTO from "../DTO/CriaAbrigoDTO";
import AbrigoEntity from "../entities/AbrigoEntity";
import EnderecoEntity from "../entities/EnderecoEntity";
import AbrigoRepository from "../repositories/AbrigoRepository";

export default class AbrigoService {
    constructor(private abrigoRepository: AbrigoRepository) {}

    async criarAbrigo(dados: CriaAdotanteDTO): Promise<AbrigoEntity> {
        const novoAbrigo = new AbrigoEntity(
            dados.endereco,
            dados.nome,
            dados.email,
            dados.senha,
            dados.celular,
        );

        await this.abrigoRepository.criaAbrigo(novoAbrigo)

        return novoAbrigo;
    }

    async listaAbrigos(): Promise<AbrigoEntity[]> {
        const abrigos = await this.abrigoRepository.listaAbrigo();

        return abrigos;
    }

    async atualizaAbrigo(idAbrigo: number, newData: Partial<AbrigoEntity>): Promise<{ success: boolean; message: string }> {
      
        const resultado = await this.abrigoRepository.atualizaAbrigo(idAbrigo, newData);

        return resultado;
    }

    async deletaAbrigo(idAbrigo: number): Promise<{ success: boolean; message: string; }> {
        const resultado = await this.abrigoRepository.deletaAbrigo(idAbrigo);

        return resultado;
    }

    async atualizaEnderecoAbrigo(idAbrigo: number, endereco: EnderecoEntity): Promise<void> {
        await this.abrigoRepository.atualizaEnderecoAbrigo(idAbrigo,endereco);
    }
}
import AbrigoEntity from "../../entities/AbrigoEntity";
import EnderecoEntity from "../../entities/EnderecoEntity";


export default interface InterfaceAbrigoRepository {

    criaAbrigo(abrigo: AbrigoEntity): void | Promise<void>;
    listaAbrigo(): Promise<AbrigoEntity[]>;
    atualizaAbrigo(abrigoId: number, newData: Partial<AbrigoEntity>): void;
    deletaAbrigo(abrigoId: number): void ;
    atualizaEnderecoAbrigo(idAbrigo: number, endereco: EnderecoEntity): void;

}


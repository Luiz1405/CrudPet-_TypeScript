import AdotanteEntity from "../../entities/AdotanteEntity";
import AdontanteEntity from "../../entities/AdotanteEntity";
import EnderecoEntity from "../../entities/EnderecoEntity";

export default interface InterfacePetRepository {
    criaAdotante (adotante: AdontanteEntity): void | Promise<void>;
    listaAdotantes(): Promise<AdontanteEntity[]>;
    atualizaAdotante(id: number, newData: AdotanteEntity): Promise<{ success: boolean; message?: string }>;
    deletaAdotante(id: number): Promise<{ success: boolean; message?: string}>;
    atualizaEnderecoAdotante(idAdotante: number, endereco: EnderecoEntity): Promise<{ success: boolean; message?: string }> | void;
}
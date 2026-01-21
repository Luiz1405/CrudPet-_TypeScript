import AbrigoEntity from "../../entities/AbrigoEntity";


export default interface InterfaceAbrigoRepository {

    criaAbrigo(abrigo: AbrigoEntity): void | Promise<void>;
    listaAbrigo(): Promise<AbrigoEntity[]>;
    atualizaAbrigo(abrigoId: number, newData: Partial<AbrigoEntity>): Promise<{ success: boolean, message: string}>;
    deletaAbrigo(abrigoId: number): Promise<{ success: boolean, message: string}>;

}


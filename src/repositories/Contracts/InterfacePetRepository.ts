import PetEntity from "../../entities/PetEntity";
import EnumPorte from "../../enum/EnumPorte";

export default interface InterfacePetRepository{
    criaPet(pet: PetEntity): void;
    listaPet(): Array<PetEntity> | Promise<PetEntity[]>;
    atualizarPet(id: number, newData:PetEntity): Promise<{ success: boolean; message?: string}>;
    deletaPet(id: number, pet:PetEntity): Promise<{success: boolean; message?: string}>;
    buscaPetPeloPorte(porte: EnumPorte): Promise<PetEntity[]>;
    buscaPetPorCampoGenerico<Tipo extends keyof PetEntity>(campo:Tipo, valor:PetEntity[Tipo]): Promise<PetEntity[]>;
}
import PetEntity from "../../entities/PetEntity";
import EnumPorte from "../../enum/EnumPorte";

export default interface InterfacePetRepository{
    criaPet(pet: PetEntity): void | Promise<void>;
    listaPet(): Array<PetEntity> | Promise<PetEntity[]>;
    atualizarPet(id: number, newData:PetEntity): void;
    deletaPet(id: number, pet:PetEntity): void;
    adotaPet( idPet: number,idAdotante: number):void;
    buscaPetPeloPorte(porte: EnumPorte): Promise<PetEntity[]>;
    buscaPetPorCampoGenerico<Tipo extends keyof PetEntity>(campo:Tipo, valor:PetEntity[Tipo]): Promise<PetEntity[]>;
}
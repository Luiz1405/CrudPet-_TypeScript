import PetEntity from "../entities/PetEntity";

type TipoRequestBodyPet=Omit<PetEntity, "id">;

type TipoRequestParamsBodyPet = { id?: string, pet_id?:string, adotante_id?:string };
type TipoResponseBodyPet={
    data?:Pick<PetEntity, "id" | "nome" | "especie" | "porte"> | Pick<PetEntity, "id" | "nome" | "especie" | "porte">[];
};

export {
    TipoRequestBodyPet, 
    TipoResponseBodyPet, 
    TipoRequestParamsBodyPet }


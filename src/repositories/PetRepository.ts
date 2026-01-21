import { Repository } from "typeorm";
import PetEntity from "../entities/PetEntity";
import InterfacePetRepository from "./Contracts/InterfacePetRepository";
import AdotanteRepository from "./AdotanteRepository";
import AdotanteEntity from "../entities/AdotanteEntity";
import EnumPorte from "../enum/EnumPorte";
import { NaoEncontrado } from "../utils/manipulaErros";

export default class PetRepository implements InterfacePetRepository {

    private petRepository:Repository<PetEntity>
    private adotanteRepository: Repository<AdotanteEntity>

    constructor(petRepository: Repository<PetEntity>, adotanteRepository: Repository<AdotanteEntity>) {
        this.petRepository = petRepository;
        this.adotanteRepository = adotanteRepository;
    }

    criaPet(pet: PetEntity): void {
        this.petRepository.save(pet);
    }

    async listaPet(): Promise<PetEntity[]> {
        return await this.petRepository.find();
    }

    async atualizarPet(id: number, newData: PetEntity){
        const petToUpdate = await this.petRepository.findOne({ where: { id }});

            if(!petToUpdate) {
                throw new NaoEncontrado("Adotante não encontrado");
            }

            Object.assign(petToUpdate, newData);

            await this.petRepository.save(petToUpdate);

            return { success: true};
    }

    async deletaPet(id: number, pet: PetEntity) {
        const petToDelete = await this.petRepository.findOne( { where: { id }});

            if(!petToDelete) {
                throw new NaoEncontrado("Adotante não encontrado");
            }

            await this.petRepository.delete(petToDelete);

            return { 
                success: true,
                message: "Pet deletado com sucesso."
            }
    }

    async adotaPet(
        idPet: number,
        idAdotante: number
    ) {
        const pet = await this.petRepository.findOne({ where: { id: idPet }})

        if(!pet) {
            throw new NaoEncontrado("Adotante não encontrado");
        }

        const adotante = await this.adotanteRepository.findOne({ where: { id: idAdotante}});

        if(!adotante) {
            return { success: false, message: "Adotante não encontrado."};
        }

        pet.adotante = adotante;
        pet.adotado = true;

        await this.petRepository.save(pet);
        return { success: true};
    } 

    async buscaPetPeloPorte(porte:EnumPorte): Promise<PetEntity[]> {
        const pets = await this.petRepository.find({ where: { porte }});

        return pets;
    }

    async buscaPetPorCampoGenerico<Tipo extends keyof PetEntity>(campo: Tipo, valor: PetEntity[Tipo]): Promise<PetEntity[]> {
        const pets = await this.petRepository.find({ where: {[campo]: valor}});
        return pets;
    }

}

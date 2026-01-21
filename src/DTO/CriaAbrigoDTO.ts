import EnderecoEntity from "../entities/EnderecoEntity";


export default interface CriaAbrigoDTO {
    endereco: EnderecoEntity;
    nome:string;
    email: string;
    senha: string;
    celular: string;

}
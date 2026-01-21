import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import EnderecoEntity from "./EnderecoEntity";
import PetEntity from "./PetEntity";

@Entity()
export default class AbrigoEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @OneToOne(() => EnderecoEntity, {
        nullable:true,
        cascade:true,
        eager:true
    })
    @JoinColumn()
    endereco?: EnderecoEntity;

    @Column()
    nome: string;

    @Column({ unique: true})
    email: string;

    @Column()
    senha: string;

    @Column({ unique:true})
    celular: string;

    @OneToMany( () => PetEntity, (pet) => pet.abrigo)
    pets!: PetEntity;

    constructor(endereco: EnderecoEntity, nome: string, email: string, senha: string, celular: string) {
        this.endereco = endereco;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.celular = celular;
    }
}
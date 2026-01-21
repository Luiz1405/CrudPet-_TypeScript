import AdotanteEntity from "../entities/AdotanteEntity";

type TipoRequestBodyAdotante=Omit<AdotanteEntity, "id"|"pets">;

type TipoRequestParamsBodyAdotante = { id?: string };
type TipoResponseBodyAdotante={
    data?:Pick<AdotanteEntity, "id" | "nome" | "celular" | "endereco" > | Pick<AdotanteEntity, "id" | "nome" | "celular">[] | "endereco";
    error?:unknown;
};

export {TipoRequestBodyAdotante, TipoResponseBodyAdotante, TipoRequestParamsBodyAdotante }


export class Professor {
    constructor(
        public id: number,
        public nome: string,
        public cnpj: string,
        public nomeFantasia: string,
        public chavePix: string,
        public formacao: string,
        public signo: string,
        public dataNascimento?: Date,
    ){}
}

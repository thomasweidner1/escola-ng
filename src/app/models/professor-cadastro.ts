export class ProfessorCadastro {
    constructor(
        public nome: string = '',
        public cnpj: string = '',
        public nomeFantasia: string = '',
        public formacao: string = '',
        public chavePix: string = '',
        public signo: string = '',
        public dataNascimento?: Date,
    ){}
}

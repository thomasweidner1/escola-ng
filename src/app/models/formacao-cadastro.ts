import { Time } from "@angular/common";

export class FormacaoCadastro {
    constructor(
        public nome: string = '',
        public descricao: string = '',
        public duracao: Time = { hours: 0, minutes: 0 }
    ) {}
}

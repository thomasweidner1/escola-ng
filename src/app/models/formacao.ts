import { Time } from "@angular/common";

export class Formacao {
    constructor(
        public id?: number,
        public nome: string = '',
        public descricao: string = '',
        public duracao: Time = { hours: 0, minutes: 0 } 
    ) {}
}

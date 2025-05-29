import { Component } from '@angular/core';
import { Professor } from '../../../models/professor';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-professores-lista',
  imports: [TableModule],
  templateUrl: './professores-lista.component.html',
  styleUrl: './professores-lista.component.css'
})
export class ProfessoresListaComponent {
    professores: Professor[]

    constructor(){
      this.professores = []
    }

    // tabela principal
    // ngOnInit() {
    //     this.productService.getProductsMini().then((data) => {
    //         this.products = data;
    //     });
    // }
}


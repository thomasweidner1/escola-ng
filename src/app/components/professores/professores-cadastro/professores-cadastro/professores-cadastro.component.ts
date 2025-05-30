import { Component } from '@angular/core';
import { ProfessorCadastro } from '../../../../models/professor-cadastro';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ProfessorService } from '../../../../services/professor.service';

@Component({
  selector: 'app-professores-cadastro',
  imports: [
    FormsModule,
    InputTextModule,
    FloatLabelModule,
    InputMaskModule,
    ButtonModule,
    ToastModule,
  ],
  templateUrl: './professores-cadastro.component.html',
  styleUrl: './professores-cadastro.component.css',
  providers: [MessageService],
})
export class ProfessoresCadastroComponent {
  
  professor: ProfessorCadastro;

  constructor(
    private professorService: ProfessorService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.professor = new ProfessorCadastro();
  }

  cadastrar() {
    this.professorService.cadastrar(this.professor).subscribe({
      next: () => this.apresentarMensagemCadastrado(),
      error: erro => console.log("Ocorreu um erro ao cadastrar o professor: " + erro)
    });
  }

  apresentarMensagemCadastrado(): void {
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Professor cadastrado com sucesso' });
    this.router.navigate(["/professores"]);
  }

  
}

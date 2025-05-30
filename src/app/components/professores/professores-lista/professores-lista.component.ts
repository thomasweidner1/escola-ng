import { Component, Input } from '@angular/core';
import { Professor } from '../../../models/professor';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ProfessorService } from '../../../services/professor.service';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DataHoraCustomizadaPipe } from '../../../pipes/data-hora-customizada.pipe';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-professores-lista',
  imports: [
    TableModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    ToastModule,
    ConfirmDialogModule,
    DataHoraCustomizadaPipe
  ],
  providers: [
    ConfirmationService,
    MessageService,
    ProfessorService,
    DataHoraCustomizadaPipe,
    DatePipe,
  ],
  templateUrl: './professores-lista.component.html',
  styleUrl: './professores-lista.component.css'
})
export class ProfessoresListaComponent {
  professores: Professor[]
  carregandoProfessores: boolean = false;

  constructor(
    private router: Router,
    private professorService: ProfessorService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.professores = []
  }

  ngOnInit(): void {
    this.carregarProfessores();
  }

  private carregarProfessores() {
    this.carregandoProfessores = true;
    this.professorService.obterTodos().subscribe({
      next: professores => this.professores = professores,
      error: erro => console.log(`Ocorreu um erro ao carregar a lista de professores: ${erro}`),
      complete: () => this.carregandoProfessores = false,
    });
  }

  paginaCadastro() {
    this.router.navigate(["/professores/cadastro"]);
  }

  paginaEditar(id: number) {
    this.router.navigate([`/professores/editar/${id}`]);
  }

  confirmarParaApagar(event: Event, professorId: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Deseja realmente apagar?',
      header: 'CUIDADO',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Deletar',
        severity: 'danger'
      },
      accept: () => this.apagar(professorId)
    });
  }

  private apagar(id: number) {
    this.professorService.apagar(id).subscribe({
      next: () => this.apresentarMensagemApagado(),
      error: erro => console.log(`Ocorreu um erro ao apagar o professor: ${erro}`),
      complete: () => this.carregarProfessores()
    });
  }

  private apresentarMensagemApagado() {
    this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'Aluno removido com sucesso' });
    this.carregarProfessores();
  }
  
  

}


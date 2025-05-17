import { Component } from '@angular/core';
import { Aluno } from '../../../models/aluno';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Dialog } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { DataHoraCustomizadaPipe } from '../../../pipes/data-hora-customizada.pipe';
import { DatePipe } from '@angular/common';
import { FormatarCpfPipe } from '../../../pipes/formatar-cpf.pipe';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AlunoCadastro } from '../../../models/aluno-cadastro';
import { InputMaskModule } from 'primeng/inputmask';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-alunos-lista',
  imports: [
    ButtonModule,
    FormsModule,
    InputTextModule,
    Dialog,
    TableModule,
    DataHoraCustomizadaPipe,
    FormatarCpfPipe,
    ConfirmDialogModule,
    ToastModule,
    InputMaskModule,
    DatePickerModule,
  ],
  templateUrl: './alunos-lista.component.html',
  styleUrl: './alunos-lista.component.css',
  providers: [
    DataHoraCustomizadaPipe,
    DatePipe,
    FormatarCpfPipe,
    MessageService,
    ConfirmationService
  ]
})
export class AlunosListaComponent {
  alunos: Aluno[];
  
  alunoCadastro: AlunoCadastro; // objeto que será utilizada na dialog(modal) para cadastrar

  visible: boolean = false;

  dataMaxima: Date;
  dataMinima: Date;


  constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.alunos = [
      new Aluno("Matheus", "da Silva", new Date(2000, 4, 5), 1, "92134567899"),
      new Aluno("Maria", "Da Silva", new Date(2000, 4, 5), 1, '921.345.678-99')
    ]

    let dataHoraAgora = new Date(Date.now());

    this.alunoCadastro = new AlunoCadastro;
    
    this.dataMinima = new Date(1900, 0, 1);
    this.dataMaxima = new Date(dataHoraAgora.getFullYear(), dataHoraAgora.getMonth(), dataHoraAgora.getDay());

  }

  abrirModalCadastrar() {
    this.visible = true;
  }

  confirm1(event: Event) {
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
        label: 'Confirmar',
      },
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
          life: 3000,
        });
      },
    });
  }
}

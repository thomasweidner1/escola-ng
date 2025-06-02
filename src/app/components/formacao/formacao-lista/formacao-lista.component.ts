import { Component, OnInit } from '@angular/core';
import { Formacao } from '../../../models/formacao';
import { FormacaoCadastro } from '../../../models/formacao-cadastro';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormacaoService } from '../../../services/formacao.service';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DatePickerModule } from 'primeng/datepicker';
import { Dialog } from 'primeng/dialog';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-formacao-lista',
  imports: [
    ButtonModule,
    FormsModule,
    InputTextModule,
    Dialog,
    TableModule,
    ConfirmDialogModule,
    ToastModule,
    InputMaskModule,
    DatePickerModule,
  ],
  templateUrl: './formacao-lista.component.html',
  styleUrl: './formacao-lista.component.css',
  providers: [
    MessageService,
    ConfirmationService,
    FormacaoService,
  ],
})
export class FormacaoListaComponent {

  formacoes: Formacao[];
  formacaoCadastro: FormacaoCadastro;
  carregandoFormacoes: boolean = false;
  dialogVisivelCadastrarEditar: boolean = false;
  idEditar?: number;
  dialogTituloCadastrarEditar?: string;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private formacaoService: FormacaoService,
  ) {
    this.formacoes = [];
    this.formacaoCadastro = new FormacaoCadastro;


  }

  ngOnInit() {
    this.carregarFormacoes();
  }

  private carregarFormacoes() {
    this.carregandoFormacoes = true;
    this.formacaoService.obterTodos().subscribe({
      next: formacoes => this.formacoes = formacoes,
      error: erro => console.log("Ocorreu um erro ao carregar as formações: ", erro),
      complete: () => this.carregandoFormacoes = false
    });
  }

  abrirCadastrar() {
    this.dialogTituloCadastrarEditar = 'Cadastro de Formação';
    this.dialogVisivelCadastrarEditar = true;
    this.idEditar = undefined;
    this.formacaoCadastro = new FormacaoCadastro();
  }

  abrirEditar(formacao: Formacao) {
    this.dialogTituloCadastrarEditar = 'Edição de Formação';
    this.dialogVisivelCadastrarEditar = true;
    this.formacaoCadastro = new FormacaoCadastro;
    this.idEditar = formacao.id;
    this.formacaoCadastro.nome = formacao.nome;
    this.formacaoCadastro.descricao = formacao.descricao;
    this.formacaoCadastro.duracao = formacao.duracao;
  }

  confirmarExcluir(event: Event, formacaoId: number) {
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
      accept: () => this.apagar(formacaoId)
    });
  }

  private apagar(formacaoId: number) {
    this.formacaoService.apagar(formacaoId).subscribe({
      next: () => this.apresentarMensagemApagado(),
      error: erro => console.log(`Ocorreu um erro ao apagar o formação: ${erro}`),
    })
  }
  apresentarMensagemApagado(): void {
    this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'Aluno removido com sucesso' });
    this.carregarFormacoes();
  }

}



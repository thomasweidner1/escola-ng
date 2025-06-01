import { Component, OnInit } from '@angular/core';
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
import { AlunoService } from '../../../services/aluno.service';

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
    ConfirmationService,
    AlunoService,
  ]
})
export class AlunosListaComponent implements OnInit {
  alunos: Aluno[];
  alunoCadastro: AlunoCadastro; // objeto que será utilizada na dialog(modal) para cadastrar
  dialogVisivelCadastrarEditar: boolean = false;
  dialogTituloCadastrarEditar?: string;
  idAlunoEditar?: number;
  carregandoAlunos: boolean = false;
  dataMaxima: Date;
  dataMinima: Date;

  constructor(
    private confirmationService: ConfirmationService, private messageService: MessageService,
    private alunoService: AlunoService,
  ) {
    this.alunos = []

    let dataHoraAgora = new Date(Date.now());
    this.alunoCadastro = new AlunoCadastro;

    this.dataMinima = new Date(1900, 0, 1);
    this.dataMaxima = new Date(dataHoraAgora.getFullYear(), dataHoraAgora.getMonth(), dataHoraAgora.getDate(), 23, 59, 59);

  }

  ngOnInit(): void {
    this.carregarAlunos();
  }

  private carregarAlunos() {
    this.carregandoAlunos = true;
    // fazer a requisição para o back-end
    this.alunoService.obterTodos().subscribe({
      next: alunos => this.alunos = alunos,
      error: erro => console.log("Ocorreu um erro ao carregar a lista de alunos:" + erro),
      complete: () => this.carregandoAlunos = false
    });
  }

  abrirModalCadastrar() {
    this.dialogTituloCadastrarEditar = "Cadastro de Aluno";
    this.dialogVisivelCadastrarEditar = true;
    this.idAlunoEditar = undefined
    this.alunoCadastro = new AlunoCadastro();
  }

  abrirModalEditar(aluno: Aluno) {
    this.dialogTituloCadastrarEditar = `Editar Aluno - ${aluno.nome.toString()} ${aluno.sobrenome.toString()}`;
    this.alunoCadastro = new AlunoCadastro;
    this.alunoCadastro.nome = aluno.nome;
    this.alunoCadastro.sobrenome = aluno.sobrenome;
    this.alunoCadastro.cpf = aluno.cpf;
    this.alunoCadastro.dataNascimento = new Date(aluno.dataNascimento!);
    this.idAlunoEditar = aluno.id;

    this.dialogVisivelCadastrarEditar = true;
  }

  confirmarParaApagar(event: Event, alunoId: number) {
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
      accept: () => this.apagar(alunoId)
    });
  }

  private apagar(alunoId: number) {
    this.alunoService.apagar(alunoId).subscribe({
      next: () => this.apresentarMensagemApagado(),
      error: erro => console.log(`Ocorreu um erro ao apagar o aluno: ${erro}`),
    })
  }

  private apresentarMensagemApagado() {
    this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'Aluno removido com sucesso' });
    this.carregarAlunos();
  }

  cadastrar() {
    this.alunoService.cadastrar(this.alunoCadastro).subscribe({
      next: aluno => this.apresentarMensagemCadastrado(),
      error: erro => console.log("Ocorreu um erro ao cadastrar o aluno:" + erro),
    })
  }

  private apresentarMensagemCadastrado() {
    this.dialogVisivelCadastrarEditar = false
    this.alunoCadastro = new AlunoCadastro();
    this.carregarAlunos();
    this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'Aluno cadastrado com sucesso' });
  }

  salvar() {
    if (this.idAlunoEditar === undefined)
      this.cadastrar();
    else
      this.editar();
  }

  private editar() {
    this.alunoService.alterar(this.idAlunoEditar!, this.alunoCadastro).subscribe({
      next: aluno => this.apresentarMensagemEditado(),
      error: erro => console.log(`Ocorreu um erro ao editar o aluno: ${erro}`)
    })
  }

  private apresentarMensagemEditado() {
    this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'Aluno alterado com sucesso' });
    this.dialogVisivelCadastrarEditar = false
    this.idAlunoEditar = undefined;
    this.alunoCadastro = new AlunoCadastro();
    this.carregarAlunos();
  }

}

/* HTTP METHODS:
  get => consultar um item em específico ou uma lista de itens
  post => criar um item
  delete => apagar um item específico
  put => alterar um registro

  200 => ok
  201 => created (criado)
  204 => no content => back-end n trouxe nenhum conteúdo, ok a parada
  404 => não encontrado
*/
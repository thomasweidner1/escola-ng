import { Component } from '@angular/core';
import { ProfessorEditar } from '../../../../models/professor-editar';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProfessorCadastro } from '../../../../models/professor-cadastro';
import { ProfessorService } from '../../../../services/professor.service';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePicker } from 'primeng/datepicker';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { Professor } from '../../../../models/professor';

@Component({
  selector: 'app-professores-editar',
  imports: [
    FormsModule,
    InputTextModule,
    FloatLabelModule,
    InputMaskModule,
    ButtonModule,
    ToastModule,
    SelectModule,
    DatePicker,
    DropdownModule
  ],
  providers: [MessageService],
  templateUrl: './professores-editar.component.html',
  styleUrl: './professores-editar.component.css'
})
export class ProfessoresEditarComponent {
  dataMaxima: Date;
  dataMinima: Date;
  formacoes = [
    { label: 'Engenharia de Software', value: 'Engenharia de Software' },
    { label: 'Análise e Desenvolvimento de Sistemas', value: 'Análise e Desenvolvimento de Sistemas' },
    { label: 'Ciência da Computação', value: 'Ciência da Computação' },
    { label: 'Sistemas de Informação', value: 'Sistemas de Informação' },
    { label: 'Engenharia da Computação', value: 'Engenharia da Computação' }
  ];


  professor: ProfessorEditar;
  idEditar: number;

  constructor(
    private professorService: ProfessorService,
    private messageService: MessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    let dataHoraAgora = new Date(Date.now());
    this.professor = new ProfessorCadastro();
    this.dataMinima = new Date(1900, 0, 1);
    this.dataMaxima = new Date(dataHoraAgora.getFullYear(), dataHoraAgora.getMonth(), dataHoraAgora.getDate(), 23, 59, 59);
    this.idEditar = parseInt(this.activatedRoute.snapshot.paramMap.get("id")!.toString());
  }

  ngOnInit() {
    this.professorService.obterPorId(this.idEditar).subscribe({
      next: (professor) => this.preencherCamposParaEditar(professor),
      error: erro => console.log("Ocorreu um erro ao obter o professor: " + erro)
    });
  }

  private preencherCamposParaEditar(professor: Professor) {
    this.professor.nome = professor.nome;
    this.professor.cnpj = professor.cnpj;
    this.professor.nomeFantasia = professor.nomeFantasia;
    this.professor.formacao = professor.formacao;
    this.professor.chavePix = professor.chavePix;
    this.professor.dataNascimento = new Date(professor.dataNascimento!);
    this.professor.signo = professor.signo;
  }

  editar(idEditar: number) {
    this.professor.formacao;
    this.definirSigno();
    this.professorService.editar(idEditar, this.professor).subscribe({
      next: () => this.apresentarMensagemEditado(),
      error: erro => console.log("Ocorreu um erro ao editar o professor: " + erro)
    });
  }

  apresentarMensagemEditado(): void {
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Professor editado com sucesso' });
    this.router.navigate(["/professores"]);
  }

  private definirSigno() {
    if (!this.professor.dataNascimento) {
      this.professor.signo = '';
      return;
    }
    const mes = this.professor.dataNascimento.getMonth() + 1;
    const dia = this.professor.dataNascimento.getDate();

    if ((mes === 3 && dia >= 21) || (mes === 4 && dia <= 19)) {
      this.professor.signo = 'Áries';
    } else if ((mes === 4 && dia >= 20) || (mes === 5 && dia <= 20)) {
      this.professor.signo = 'Touro';
    } else if ((mes === 5 && dia >= 21) || (mes === 6 && dia <= 20)) {
      this.professor.signo = 'Gêmeos';
    } else if ((mes === 6 && dia >= 21) || (mes === 7 && dia <= 22)) {
      this.professor.signo = 'Câncer';
    } else if ((mes === 7 && dia >= 23) || (mes === 8 && dia <= 22)) {
      this.professor.signo = 'Leão';
    } else if ((mes === 8 && dia >= 23) || (mes === 9 && dia <= 22)) {
      this.professor.signo = 'Virgem';
    } else if ((mes === 9 && dia >= 23) || (mes === 10 && dia <= 22)) {
      this.professor.signo = 'Libra';
    } else if ((mes === 10 && dia >= 23) || (mes === 11 && dia <= 21)) {
      this.professor.signo = 'Escorpião';
    } else if ((mes === 11 && dia >= 22) || (mes === 12 && dia <= 21)) {
      this.professor.signo = 'Sagitário';
    } else if ((mes === 12 && dia >= 22) || (mes === 1 && dia <= 19)) {
      this.professor.signo = 'Capricórnio';
    } else if ((mes === 1 && dia >= 20) || (mes === 2 && dia <= 18)) {
      this.professor.signo = 'Aquário';
    } else if ((mes === 2 && dia >= 19) || (mes === 3 && dia <= 20)) {
      this.professor.signo = 'Peixes';
    }
  }
}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CursoCadastro } from '../../../models/curso-cadastro';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CursoService } from '../../../services/curso.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-curso-cadastro',
  imports: [
    FormsModule, 
    InputTextModule, 
    FloatLabelModule, 
    InputMaskModule, 
    ButtonModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './curso-cadastro.component.html',
  styleUrl: './curso-cadastro.component.css',
})
export class CursoCadastroComponent {

  curso: CursoCadastro;

  constructor(
    private router: Router,
    private cursoService: CursoService,
    private messageService: MessageService,
  ){
    this.curso = new CursoCadastro
  }

  cadastrar(){
    this.cursoService.cadastrar(this.curso).subscribe({
      next: curso => this.apresentarMensagemCadastrado(),
      error: erro => console.log("Ocorreu um erro ao cadastrar o curso:" + erro)
    });
  }
  apresentarMensagemCadastrado(): void {
    this.messageService.add({severity: 'succes', summary: 'Sucesso', detail:'Curso cadastrado com sucesso'});
    this.router.navigate(["/cursos"]);
  }


}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CursoCadastro } from '../../../models/curso-cadastro';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-curso-cadastro',
  imports: [FormsModule, InputTextModule, FloatLabelModule, InputMaskModule, ButtonModule],
  templateUrl: './curso-cadastro.component.html',
  styleUrl: './curso-cadastro.component.css',
  providers: [MessageService, ConfirmationService]
})
export class CursoCadastroComponent {

  curso = new CursoCadastro;


}

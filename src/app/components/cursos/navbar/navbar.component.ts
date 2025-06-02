import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { Menubar } from 'primeng/menubar';
import { Ripple } from 'primeng/ripple';

@Component({
  selector: 'app-navbar',
  imports: [Menubar, BadgeModule, AvatarModule, InputTextModule, Ripple, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class NavbarComponent {
  items: MenuItem[];

  constructor(private router: Router){
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => this.navegar("/")
      },
      {
        label: 'Cursos',
        icon: 'pi pi-book',
        command: () => this.navegar("/cursos")
      },
      {
        label: 'Formações',
        icon: 'pi pi-graduation-cap',
        command: () => this.navegar("/formacoes")
      },
      {
        label: 'Alunos',
        icon: 'pi pi-user',
        command: () => this.navegar("/alunos")
      },
      {
        label: 'Professores',
        icon: 'pi pi-users',
        command: () => this.navegar("/professores")
      },
    ]
  }

  private navegar(caminho: string){
    this.router.navigate([caminho]);
  }
}

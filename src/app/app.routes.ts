import { Routes } from '@angular/router';
import { CursosListaComponent } from './components/cursos/cursos-lista/cursos-lista.component';
import { CursoCadastroComponent } from './components/cursos/curso-cadastro/curso-cadastro.component';
import { AlunosListaComponent } from './components/alunos/alunos-lista/alunos-lista.component';
import { CursoEditarComponent } from './components/cursos/curso-editar/curso-editar.component';
import { ProfessoresListaComponent } from './components/professores/professores-lista/professores-lista.component';
import { ProfessoresCadastroComponent } from './components/professores/professores-cadastro/professores-cadastro/professores-cadastro.component';
import { ProfessoresEditarComponent } from './components/professores/professores-editar/professores-editar/professores-editar.component';
import { FormacaoListaComponent } from './components/formacao/formacao-lista/formacao-lista.component';

export const routes: Routes = [
    {path: "cursos", component: CursosListaComponent},
    {path: "cursos/cadastro", component: CursoCadastroComponent},
    {path: "alunos", component: AlunosListaComponent},
    {path: `cursos/editar/:id`, component: CursoEditarComponent},
    {path: "professores", component: ProfessoresListaComponent},
    {path: "professores/cadastro", component: ProfessoresCadastroComponent},
    {path: "professores/editar/:id", component: ProfessoresEditarComponent},
    {path: "formacoes", component: FormacaoListaComponent},
];

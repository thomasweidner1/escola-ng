import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProfessorCadastro } from '../models/professor-cadastro';
import { Observable } from 'rxjs';
import { Professor } from '../models/professor';
import { ProfessorEditar } from '../models/professor-editar';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  private urlApi: string;

  constructor(private http: HttpClient) { 
    this.urlApi = "http://localhost:8000/api/professores";
  }

  cadastrar(ProfessorCadastro: ProfessorCadastro): Observable<Professor> {
    return this.http.post<Professor>(this.urlApi, ProfessorCadastro);
  }

  obterTodos(): Observable<Professor[]> {
    return this.http.get<Professor[]>(this.urlApi);
  }

  apagar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlApi}/${id}`);
  }

  obterPorId(id: number): Observable<Professor> {
    return this.http.get<Professor>(`${this.urlApi}/${id}`);
  }

  editar(id: number, professor: ProfessorEditar): Observable<Professor> {
    return this.http.put<Professor>(`${this.urlApi}/${id}`, professor);
  }


}

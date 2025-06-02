import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Aluno } from '../models/aluno';
import { AlunoCadastro } from '../models/aluno-cadastro';

@Injectable({
  providedIn: 'root'
})
export class FormacaoService {
  private urlApi: string;

  constructor(
    private http: HttpClient
  ) {
    this.urlApi = "http://localhost:8000/api/formacoes";
  }

  cadastrar(alunoCadastro: AlunoCadastro): Observable<any> {
    return this.http.post<any>(this.urlApi,
      alunoCadastro);
  }

  obterTodos(): Observable<Array<Aluno>> {
    return this.http.get<Array<Aluno>>(this.urlApi);
  }

  apagar(id: number): Observable<any> {
    return this.http.delete<any>(`${this.urlApi}/${id}`);
    // return this.http.delete<any>(this.urlApi + "/" + id);
  }

  alterar(id: number, aluno: Aluno): Observable<any> {
    return this.http.put<any>(`${this.urlApi}/${id}`, aluno);
  }

}

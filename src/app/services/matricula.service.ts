import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Matricula, MatriculaCadastrar } from '../models/matricula';

@Injectable({
  providedIn: 'root'
})
export class MatriculaService {
  private urlApi: string;

  constructor(private http: HttpClient) {
    this.urlApi = "http://localhost:8000/api/matricula";
  }

  cadastrar(matriculaCadastro: MatriculaCadastrar): Observable<any> {
    return this.http.post<any>(this.urlApi,
      matriculaCadastro);
  }

  obterTodos(idCurso: number): Observable<Array<Matricula>> {
    let params = new HttpParams()
      .set("idCurso", idCurso.toString());
    // http://localhost:8000/api/matriculas?idCurso=20
    return this.http.get<Array<Matricula>>(this.urlApi, {params});
  }

  apagar(id: number): Observable<any> {
    return this.http.delete<any>(`${this.urlApi}/${id}`);
  }

  alterar(id: number, matricula: Matricula): Observable<any> {
    return this.http.put<any>(`${this.urlApi}/${id}`, matricula);
  }
}

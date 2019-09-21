import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, map } from 'rxjs/operators';
import { EstadoBr } from '../model/estado-br';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) { }

  getEstadosBr(){
    return this.http.get<EstadoBr[]>('assets/dados/estadosbr.json');
  }

  getCargos(){
    return [
      {id: 1, nome: 'Dev', nivel: 'Junior', desc: 'Dev J'},
      {id: 2, nome: 'Dev', nivel: 'Plenor', desc: 'Dev P'},
      {id: 3, nome: 'Dev', nivel: 'Senior', desc: 'Dev S'},
    ];
  }

  getTecnologias(){
    return [
      {id: 1, nome: 'Java', desc: 'Java'},
      {id: 2, nome: 'Javascript', desc: 'Javascript'},
      {id: 3, nome: 'PHP', desc: 'PHP'},
      {id: 3, nome: 'Ruby', desc: 'Ruby'},
    ];
  }

  getRariosOptions(){
    return [
      {value: true, desc: 'Sim'},
      {value: false, desc: 'Não'}
    ];
  }
}

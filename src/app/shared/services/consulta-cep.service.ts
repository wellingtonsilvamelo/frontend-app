import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  constructor(private http: HttpClient) { }

  consultarCEP(cep: string){
    cep = cep.replace(/\D/g,'');
    if(cep !== ""){
      let validaCEP = /^[0-9]{8}$/;
      if(validaCEP.test(cep)){
        return this.http.get(`//viacep.com.br/ws/${cep}/json`);
      }
    }
  }

}

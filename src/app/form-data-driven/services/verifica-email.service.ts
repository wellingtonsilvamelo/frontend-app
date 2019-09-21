import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, delay, debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VerificaEmailService {

  constructor(private http: HttpClient) { }

  verificarEmail(email: string){
    return this.http.get('assets/dados/verificarEmail.json')
    .pipe(
      delay(2000),
      map((data: { emails: any[] }) => data.emails),
      tap(console.log), 
      map((data: { email: string }[]) => data.find(v => v.email === email) ? true : false),
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Task } from './model/task';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const httpPostParamOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
};
const apiUrl = 'http://localhost:8085/api/task';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getTasks (): Observable<any> {
    return this.http.get<any>(apiUrl)
      .pipe(
        tap(tasks => console.log('leu os tasks')),
        catchError(this.handleError('getTasks', []))
      );
  }

  searchTasks (searchParam: string): Observable<any> {
    const httpBody = new HttpParams().set('searchParam', searchParam);
    return this.http.post<any>(`${apiUrl}/search`, httpBody, httpPostParamOptions)
      .pipe(
        tap(tasks => console.log('leu os tasks')),
        catchError(this.handleError('getTasks', []))
      );
  }

  saveTask (task: Task): Observable<any> {
    return this.http.post<Task>(`${apiUrl}/save`, task, httpOptions)
      .pipe(
        tap(tasks => console.log('leu os tasks')),
        catchError(this.handleError('getTasks', []))
      );
  }

  getTask(id: number): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<any>(url).pipe(
      tap(_ => console.log(`leu o task id=${id}`)),
      catchError(this.handleError<Task>(`getTask id=${id}`))
    );
  }

  addTask (task): Observable<Task> {
    return this.http.post<Task>(apiUrl, task, httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((task: Task) => console.log(`adicionou o task com w/ id=${task.id}`)),
      catchError(this.handleError<Task>('addTask'))
    );
  }

  updateTask(id, task): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, task, httpOptions).pipe(
      tap(_ => console.log(`atualiza o produco com id=${id}`)),
      catchError(this.handleError<any>('updateTask'))
    );
  }

  deleteTask (id): Observable<any> {
    const url = `${apiUrl}/delete/${id}`;
    return this.http.delete<any>(url, httpOptions).pipe(
      tap(_ => console.log(`remove o task com id=${id}`)),
      catchError(this.handleError<Task>('deleteTask'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (res: any): Observable<T> => {
      // console.error(res.error);
      return throwError(res);
    };
  }
  
}

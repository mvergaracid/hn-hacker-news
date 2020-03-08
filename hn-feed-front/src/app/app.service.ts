import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AppService {
  constructor(public http: HttpClient) {
  }

  getLastNews(): Observable<any> {
    return this.http.get(`${environment.URL_BACKEND}/${environment.PATH_LAST_NEWS}`)
      .pipe(
        catchError(err => this.handleError(err))
      )
  }

  deleteNews(data:any ): Observable<any> {
    return this.http.post(`${environment.URL_BACKEND}/${environment.DELETE_NEWS}`, data)
    .pipe(
      catchError(err => this.handleError(err))
    )
  }

  handleError(error: any): Observable<any> {
    console.log('An error occurred', error);
    return throwError(error);
  }
}
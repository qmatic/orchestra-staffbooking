import { ISettingsResponse } from './../../../models/ISettingsResponse';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';
import { calendarEndpoint, restEndpoint, DataServiceError } from '../data.service';

@Injectable()
export class SettingsAdminDataService {
  constructor(private http: HttpClient) {}

  getSettings(): Observable<ISettingsResponse> {
    return this.http
      .get<ISettingsResponse>(`${restEndpoint}/variables`)
      .pipe(catchError(this.handleError()));
  }

  private handleError<T>(requestData?: T) {
    return (res: HttpErrorResponse) => {
      const error = new DataServiceError(res.error, requestData);
      console.error(error);
      return new ErrorObservable(error);
    };
  }
}

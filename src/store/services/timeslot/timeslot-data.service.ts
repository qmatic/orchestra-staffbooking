import { GlobalErrorHandler } from './../../../services/util/global-error-handler.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';

import { calendarPublicEndpointV2, DataServiceError } from '../data.service';
import { IBookingInformation } from '../../../models/IBookingInformation';
import { ITimeslotResponse } from '../../../models/ITimeslotResponse';

@Injectable()
export class TimeslotDataService {
  constructor(private http: HttpClient, private errorHandler: GlobalErrorHandler) {}

  getTimeslots(bookingInformation: IBookingInformation): Observable<ITimeslotResponse | any> {
    return this.http
      .get<ITimeslotResponse>
      (
        `${calendarPublicEndpointV2}/branches/`
        + `${bookingInformation.branchPublicId}/dates/`
        + `${bookingInformation.date}/times`
        + `${bookingInformation.serviceQuery}`
        + `;numberOfCustomers=${bookingInformation.numberOfCustomers}`
      )
      .pipe(
        retry(3),
        catchError(this.errorHandler.handleError()
      ));
  }
}

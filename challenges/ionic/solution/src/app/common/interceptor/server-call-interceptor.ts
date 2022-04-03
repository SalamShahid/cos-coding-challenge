import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { StorageService } from '../service/storage.service';
import { MessageService } from '../service/message.service';
import { ValidationService } from '../service/validation.service';

@Injectable()
export class ServerCallInterceptor implements HttpInterceptor {
  constructor(
    private storage: StorageService,
    private message: MessageService,
    private validation: ValidationService
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!environment.production) {
      console.log('Http request intercepted.');
      console.log('Request', request);
    }
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          //Can be used to handle anything like new token from server.
          if (!this.validation.isEmptyString(event.body['token'])) {
            this.storage.set('token', event.body['token']);
          }
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log('Error: ', error.error);
        const current = new Date();
        const now = Math.round(current.getTime() / 1000);
        const errorKey =
          'Error-' + now + '-' + error.status + '-' + error.error.message;

        //Error logging and toast message for user information.
        this.storage.set(errorKey, error.error);
        this.message.showMessage(error.error.message);
        return throwError(error);
      })
    );
  }
}

import {HttpEvent, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse, HttpInterceptor} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class SnackbarInterceptor implements HttpInterceptor {

    constructor(private snackBar: MatSnackBar) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                tap(e => {
                    if (request.method == "POST" || request.method == "PUT" || request.method == "DELETE")
                      if (e instanceof HttpResponse && (e.status == 201 || e.status == 204)) {
                        this.snackBar.open('Операция прошла успешно', '', { duration: 2000 });
                      }
                }),
                catchError((error: HttpErrorResponse) => {
                    let errorMessage = '';
                    if (error.error instanceof ErrorEvent) {
                        errorMessage = `Error: ${error.error.message}`;
                    } 
                    else {
                        errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
                    }
                    this.snackBar.open(errorMessage, 'Close', { duration: 8000 });
                    return throwError(() => { return errorMessage; });
                })
            )
    }
}
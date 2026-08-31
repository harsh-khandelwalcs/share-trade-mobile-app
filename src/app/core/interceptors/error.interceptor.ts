import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { environment } from '@env/environment';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (environment.enableLogging) {
        console.error(`[HTTP ${error.status}] ${req.method} ${req.url}`, error.error);
      }
      return throwError(() => error);
    }),
  );
};

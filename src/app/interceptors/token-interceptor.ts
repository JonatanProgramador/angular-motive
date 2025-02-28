import { HttpErrorResponse, HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  //capturar los errores con el interceptor

  const url = "http://localhost:3000/messages/";
  if(req.url.includes(url)) {
    return next(req);
  } else {
    return next(req);
  }
};

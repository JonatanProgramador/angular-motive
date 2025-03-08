import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import {inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  //capturar los errores con el interceptor

  const url = "http://localhost:3000/messages/";
  const userService = inject(UserService);
  const router = inject(Router);
  if(req.url.includes(url)) {
    return next(req).pipe(catchError((error: HttpErrorResponse)=>{
      if(error.status == 401) {
        userService.setPermised(false);
        router.navigate(["/"]);
        alert("Sesión expirada");
      }
      return throwError(()=>"Sesión expirada");
    }));
  } else {
    return next(req);
  }
};

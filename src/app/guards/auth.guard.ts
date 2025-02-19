import { inject } from '@angular/core';
import { UserService } from './../services/user.service';
import { CanActivateFn, Route, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router:Router = new Router();
  const user = inject(UserService);
  if(user.getPermised()){
    return true;
  } else {
  router.navigate(['']);
  return false;
  }
};

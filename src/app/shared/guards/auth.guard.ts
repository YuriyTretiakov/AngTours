import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { inject } from '@angular/core';

// export const authGuard: CanActivateFn = (route, state) => {

//   const userService = inject(UserService);
//   const router = inject(Router);
//   const isAuth: boolean = false;
//   const isSessionStorageLogin = !!sessionStorage.getItem('login');
//   console.log('isSessionStorageLogin', isSessionStorageLogin)
//   let isAuthResult: boolean = false;
//   console.log('isAuth ', isAuth)
//   if (!isSessionStorageLogin) {
//     const isAuth = !!userService.getUser()
//     if (!isAuth) {
//       router.navigate(['auth']);
//     }
//   }
//   if (isSessionStorageLogin || isAuth) {
//     isAuthResult = true;
//   }
//   return isAuthResult;
// };
export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  const isAuth = !!userService.getUser();
  if (!isAuth) {
    router.navigate(['auth']);
    return false;
  } else {
    return true;
  }
};

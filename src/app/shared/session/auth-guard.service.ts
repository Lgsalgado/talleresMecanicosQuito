import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    protected router: Router,
    protected tokenAuth: TokenService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    console.log(this.tokenAuth.getToken());
    if (state.url !== '/login' && !this.tokenAuth.getToken()) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}

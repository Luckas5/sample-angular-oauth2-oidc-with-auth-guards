import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardWithForcedLogin implements CanActivate {


  constructor(
    private authService: AuthService,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    return this.authService.isDoneLoading$
      .pipe(filter(isDone => isDone))
      .pipe(switchMap(_ => this.authService.isAuthenticated$))
      .pipe(tap(isAuthenticated => isAuthenticated || this.authService.login(state.url)))
      .pipe(map(isAuthenticated => isAuthenticated));
  }
}

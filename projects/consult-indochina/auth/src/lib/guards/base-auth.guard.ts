import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  Router,
} from '@angular/router';
import { CiAuthStateService } from '@consult-indochina/auth';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CiAuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private readonly ciAuthStateService: CiAuthStateService,
    private readonly router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.isAuthenticated();
  }

  canActivateChild(): Observable<boolean> {
    return this.isAuthenticated();
  }

  canLoad(): Observable<boolean> {
    return this.isAuthenticated();
  }

  private isAuthenticated() {
    return this.ciAuthStateService.isAuthorized$.pipe(
      take(1),
      tap((isAuth) => {
        if (!isAuth) {
          this.router.navigate(['/log-in']);
        }
      })
    );
  }
}

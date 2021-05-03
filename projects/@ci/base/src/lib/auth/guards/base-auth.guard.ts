import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthStateService } from '../data-access/store/auth-state.service';

@Injectable({
  providedIn: 'root',
})
export class CiAuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private readonly authStateService: AuthStateService) {}

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
    return this.authStateService.isAuthorized$.pipe(take(1));
  }
}

import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { CiAuthModule } from '../ci-auth.module';
import { CiAuthStateService } from '../data-access/store/auth-state.service';

@Injectable({
  providedIn: CiAuthModule,
})
export class CiAuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private readonly CiAuthStateService: CiAuthStateService) {}

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
    return this.CiAuthStateService.isAuthorized$.pipe(take(1));
  }
}

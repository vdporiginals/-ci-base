import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad } from '@angular/router';
import { CiAuthStateService } from '@consult-indochina/auth';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private ciAuthStateService: CiAuthStateService) {
    setTimeout(() => {
        console.log('1');
        
      this.ciAuthStateService.select('AccessToken').toPromise().then((res)=>{
          console.log(res);
          
      })
    }, 1000);}

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
    console.log();
    return this.ciAuthStateService.isAuthorized$.pipe(take(1));
  }
}

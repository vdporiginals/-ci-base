import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { logErrorAndReturn } from '../../utils/log-and-return';
import { CiAuthStateService } from '../store/auth-state.service';
import { CiBasePolicyStateService } from '../store/policy-state.service';
import { CiPolicyUserService } from './policy-user.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  constructor(
    private readonly policyUserService: CiPolicyUserService,
    private readonly policyStateService: CiBasePolicyStateService,
    private readonly authStateService: CiAuthStateService
  ) {}

  /**
   * [
   *  {
   *    permissionId: 'accounts.manage',
   *    activity: 15 (full CRUD, 1 + 2 + 4 +8)
   *  },
   *  {
   *    permissionId: 'dashboard.manage',
   *    activity: 1 (READ)
   *  }
   * ]
   */

  loadPermissions(): void {
    if (this.authStateService.isAuthorized) {
      this.policyUserService
        .retrievePermissionsForUser()
        .pipe(logErrorAndReturn(() => of([])))
        .subscribe((permissions) => {
          this.policyStateService.set({
            permissions,
            permissionsReady: true,
          });
        });
    } else {
      this.policyStateService.reset(); // permissions: []
    }
  }
}

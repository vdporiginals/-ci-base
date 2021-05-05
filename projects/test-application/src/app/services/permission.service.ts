import { Injectable } from '@angular/core';
import {
  CiAuthStateService,
  CiPolicyUserService,
  logErrorAndReturn,
} from '@ci/base';
// import { logErrorAndReturn } from 'projects/@ci/base/src/lib/auth/utils/log-and-return';
import { of } from 'rxjs';
import { PermissionStateService } from './permission-state.service';

@Injectable({
  providedIn: 'root',
})
export class CiPolicyService {
  constructor(
    private readonly policyUserService: CiPolicyUserService,
    private readonly permissionStateService: PermissionStateService,
    private readonly CiAuthStateService: CiAuthStateService
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
    if (this.CiAuthStateService.isAuthorized) {
      this.policyUserService
        .retrievePermissionsForUser()
        .pipe(logErrorAndReturn(() => of([])))
        .subscribe((permissions) => {
          console.log(permissions);

          this.permissionStateService.set({
            permissions,
            permissionsReady: true,
          });
        });
    } else {
      this.permissionStateService.reset(); // permissions: []
    }
  }
}

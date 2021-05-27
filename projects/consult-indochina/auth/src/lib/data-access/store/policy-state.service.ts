import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { RxState } from '../../base/rx-state';
import { PermissionNames } from '../../directives/base-permission.directive';

export interface PermissionState {
  policies: PolicyModel[];
  policiesReady: boolean;
}
export interface PolicyModel {
  policyId: string;
  activity: Privilege;
  locationId: number;
}
export enum Privilege {
  Read = 'GET',
  Create = 'POST',
  Update = 'PUT',
  Delete = 'DELETE',
}

@Injectable({
  providedIn: 'root',
})
export class CiBasePolicyStateService extends RxState<PermissionState> {
  currentPermissions$ = this.select('policies');
  permissionReady$ = this.select('policiesReady');

  reset(): void {
    this.set({ policies: [], policiesReady: false });
  }

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
  // 3rd party: KeyCloak, Auth0, etc...
  // privilege: 1 (READ, 1), 2 (CREATE, 10), 4 (UPDATE, 100), 8 (DELETE, 1000)
  hasPermission$(
    permissionToCheck: typeof PermissionNames, // accounts.manage
    privilege: Privilege // 2
  ): Observable<boolean> {
    if (permissionToCheck == null || privilege == null) {
      return of(true);
    }

    return this.currentPermissions$.pipe(
      map((permissions) =>
        permissions.some(
          (permission) =>
            permission.policyId === permissionToCheck && // accounts.manage === accounts.manage
            permission.activity === privilege // (15 & 2) === 2
        )
      ),
      take(1)
    );
  }

  hasPermission(
    permissionToCheck: typeof PermissionNames,
    privilege: Privilege
  ): boolean {
    let hasPermission = false;
    this.hasPermission$(permissionToCheck, privilege).subscribe((value) => {
      hasPermission = value;
    });
    return hasPermission;
  }

  // hasPermissionForLocation$(
  //   permissionToCheck: typeof PermissionNames,
  //   privilege: Privilege,
  //   locationId: number
  // ): Observable<boolean> {
  //   if (permissionToCheck == null || privilege == null || locationId == null) {
  //     return of(true);
  //   }

  //   return this.currentPermissions$.pipe(
  //     map((permissions) => {
  //       return permissions.some(
  //         (permission) =>
  // (permission.locationId === null ||
  //   permission.locationId === locationId) &&
  //           permission.permissionId === permissionToCheck &&
  //           (permission.activity & privilege) === privilege
  //       );
  //     }),
  //     take(1)
  //   );
  // }

  // hasPermissionForLocation(
  //   permissionToCheck: typeof PermissionNames,
  //   privilege: Privilege,
  //   locationId: number
  // ): boolean {
  //   let permission = false;
  //   this.hasPermissionForLocation$(
  //     permissionToCheck,
  //     privilege,
  //     locationId
  //   ).subscribe((value) => {
  //     permission = value;
  //   });
  //   return permission;
  // }
}

import { Injectable } from '@angular/core';
import { CiBasePolicyStateService } from '@ci/base';
import { PermissionNames } from './pername';

@Injectable({ providedIn: 'root' })
export class PermissionStateService extends CiBasePolicyStateService<PermissionNames> {}

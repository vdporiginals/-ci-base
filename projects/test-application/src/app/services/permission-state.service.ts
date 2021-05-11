import { Injectable } from '@angular/core';
import { CiBasePolicyStateService } from '@consult-indochina/auth';
import { PermissionNames } from './pername';

@Injectable({ providedIn: 'root' })
export class PermissionStateService extends CiBasePolicyStateService<PermissionNames> {}

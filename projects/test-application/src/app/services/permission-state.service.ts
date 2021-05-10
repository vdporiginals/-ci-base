import { Injectable } from '@angular/core';
import { CiBasePolicyStateService } from 'dist/consult-indochina/auth/public-api';
import { PermissionNames } from './pername';

@Injectable({ providedIn: 'root' })
export class PermissionStateService extends CiBasePolicyStateService<PermissionNames> {}

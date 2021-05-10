import { Injectable } from '@angular/core';
import { CiBasePolicyStateService } from '../data-access/store/policy-state.service';

@Injectable({
  providedIn: 'root',
})
export class CiPolicyStateService extends CiBasePolicyStateService<any> {}

import { Observable } from 'rxjs';
import { CiAuthStateService } from '../data-access/store/auth-state.service';

export function accessTokenFactory(
  ciAuthStateService: CiAuthStateService
): Observable<string> {
  return ciAuthStateService.token$;
}

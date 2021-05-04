import { MonoTypeOperatorFunction, Observable, pipe, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export function logErrorAndReturn<TReturn = any>(
  obsFactory: (err?: any) => Observable<TReturn>
): MonoTypeOperatorFunction<TReturn> {
  return pipe(
    logErrorAndRethrow(),
    catchError((err: any) => obsFactory(err))
  );
}

export function logErrorAndRethrow<TInput = any>(
  cb?: (err?: any) => void
): MonoTypeOperatorFunction<TInput> {
  //   const monitoringService = RootInjector.get(MonitoringService);
  return catchError((err: any) => {
    console.error(err);
    // monitoringService?.logApiException(err);
    cb?.(err);
    return throwError(err);
  });
}

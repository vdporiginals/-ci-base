import { Injectable, OnDestroy } from '@angular/core';
import {
  EMPTY,
  isObservable,
  Observable,
  OperatorFunction,
  Subscribable,
  Subscription,
  Unsubscribable,
} from 'rxjs';
import { catchError, map, pluck, tap } from 'rxjs/operators';

type ProjectStateFn<T> = (oldState: T) => Partial<T>;
type ProjectValueFn<T, K extends keyof T> = (oldState: T) => T[K];

type ProjectStateReducer<T, V> = (oldState: T, value: V) => Partial<T>;

type ProjectValueReducer<T, K extends keyof T, V> = (
  oldState: T,
  value: V
) => T[K];

/**
 * @description
 * RxState is a light-weight reactive state management service for managing local state in angular.
 *
 * @example
 * Component({
 *   selector: 'app-stateful',
 *   template: `<div>{{ state$ | async | json }}</div>`,
 *   providers: [RxState]
 * })
 * export class StatefulComponent {
 *   readonly state$ = this.state.select();
 *
 *   constructor(private state: RxState<{ foo: string }>) {}
 * }
 *
 * @docsCategory RxState
 * @docsPage RxState
 */
@Injectable()
export class RxState<T extends object> implements OnDestroy, Subscribable<T> {
  private subscription = new Subscription();

  private accumulator = createAccumulationObservable<T>();
  private effectObservable = createSideEffectObservable();

  /**
   * @description
   * The unmodified state exposed as `Observable<T>`. It is not shared, distinct or gets replayed.
   * Use the `$` property if you want to read the state without having applied {@link stateful} to it.
   */
  readonly $: Observable<T> = this.accumulator.signal$;

  /**
   * @internal
   */
  constructor() {
    this.subscription.add(this.subscribe());
  }

  /**
   * @internal
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * @description
   *
   * Allows to customize state accumulation function.
   * This can be helpful to implement deep updates and tackle other immutability problems in a custom way.
   * @example
   *
   * ```typescript
   * const myAccumulator = (state: MyState, slice: Partial<MyState>) => deepCopy(state, slice);
   *
   * this.state.setAccumulator(myAccumulator);
   * ```
   */
  setAccumulator(accumulatorFn: AccumulationFn): void {
    this.accumulator.nextAccumulator(accumulatorFn);
  }

  /**
   * @description
   * Read from the state in imperative manner. Returns the state object in its current state.
   *
   * @example
   * const { disabled } = state.get();
   * if (!disabled) {
   *   doStuff();
   * }
   *
   * @return T
   */
  get(): T;

  /**
   * @description
   * Read from the state in imperative manner by providing keys as parameters.
   * Returns the part of state object.
   *
   * @example
   * // Access a single property
   *
   * const bar = state.get('bar');
   *
   * // Access a nested property
   *
   * const foo = state.get('bar', 'foo');
   *
   * @return T | T[K1] | T[K1][K2]
   */

  get<K1 extends keyof T>(k1: K1): T[K1];
  /** @internal **/
  get<K1 extends keyof T, K2 extends keyof T[K1]>(k1: K1, k2: K2): T[K1][K2];
  /** @internal **/
  get<K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2]>(
    k1: K1,
    k2: K2,
    k3: K3
  ): T[K1][K2][K3];
  /** @internal **/
  get<
    K1 extends keyof T,
    K2 extends keyof T[K1],
    K3 extends keyof T[K1][K2],
    K4 extends keyof T[K1][K2][K3]
  >(k1: K1, k2: K2, k3: K3, k4: K4): T[K1][K2][K3][K4];
  /** @internal **/
  get<
    K1 extends keyof T,
    K2 extends keyof T[K1],
    K3 extends keyof T[K1][K2],
    K4 extends keyof T[K1][K2][K3],
    K5 extends keyof T[K1][K2][K3][K4]
  >(k1: K1, k2: K2, k3: K3, k4: K4, k5: K5): T[K1][K2][K3][K4][K5];
  /** @internal **/
  get<
    K1 extends keyof T,
    K2 extends keyof T[K1],
    K3 extends keyof T[K1][K2],
    K4 extends keyof T[K1][K2][K3],
    K5 extends keyof T[K1][K2][K3][K4],
    K6 extends keyof T[K1][K2][K3][K4][K5]
  >(k1: K1, k2: K2, k3: K3, k4: K4, k5: K5, k6: K6): T[K1][K2][K3][K4][K5][K6];
  /** @internal **/
  get<
    K1 extends keyof T,
    K2 extends keyof T[K1],
    K3 extends keyof T[K1][K2],
    K4 extends keyof T[K1][K2][K3],
    K5 extends keyof T[K1][K2][K3][K4],
    K6 extends keyof T[K1][K2][K3][K4][K5]
  >(
    ...keys:
      | [K1]
      | [K1, K2]
      | [K1, K2, K3]
      | [K1, K2, K3, K4]
      | [K1, K2, K3, K4, K5]
      | [K1, K2, K3, K4, K5, K6]
  ):
    | T
    | T[K1]
    | T[K1][K2]
    | T[K1][K2][K3]
    | T[K1][K2][K3][K4]
    | T[K1][K2][K3][K4][K5]
    | T[K1][K2][K3][K4][K5][K6] {
    const hasStateAnyKeys = Object.keys(this.accumulator.state).length > 0;
    if (!!keys && keys.length) {
      return safePluck(this.accumulator.state, keys);
    } else {
      return hasStateAnyKeys
        ? this.accumulator.state
        : (undefined as unknown as T);
    }
  }

  /**
   * @description
   * Manipulate one or many properties of the state by providing a `Partial<T>` state or a `ProjectionFunction<T>`.
   *
   * @example
   * // Update one or many properties of the state by providing a `Partial<T>`
   *
   * const partialState = {
   *   foo: 'bar',
   *   bar: 5
   * };
   * state.set(partialState);
   *
   * // Update one or many properties of the state by providing a `ProjectionFunction<T>`
   *
   * const reduceFn = oldState => ({
   *   bar: oldState.bar + 5
   * });
   * state.set(reduceFn);
   *
   * @param {Partial<T>|ProjectStateFn<T>} stateOrProjectState
   * @return void
   */
  set(stateOrProjectState: Partial<T> | ProjectStateFn<T>): void;

  /**
   * @description
   * Manipulate a single property of the state by the property name and a `ProjectionFunction<T>`.
   *
   * @example
   * const reduceFn = oldState => oldState.bar + 5;
   * state.set('bar', reduceFn);
   *
   * @param {K} key
   * @param {ProjectValueFn<T, K>} projectSlice
   * @return void
   */
  set<K extends keyof T, O>(key: K, projectSlice: ProjectValueFn<T, K>): void;
  /**
   * @internal
   */
  set<K extends keyof T>(
    keyOrStateOrProjectState: Partial<T> | ProjectStateFn<T> | K,
    stateOrSliceProjectFn?: ProjectValueFn<T, K>
  ): void {
    if (
      typeof keyOrStateOrProjectState === 'object' &&
      stateOrSliceProjectFn === undefined
    ) {
      this.accumulator.nextSlice(keyOrStateOrProjectState);
      return;
    }

    if (
      typeof keyOrStateOrProjectState === 'function' &&
      stateOrSliceProjectFn === undefined
    ) {
      this.accumulator.nextSlice(
        keyOrStateOrProjectState(this.accumulator.state)
      );
      return;
    }

    if (
      isKeyOf<T>(keyOrStateOrProjectState) &&
      typeof stateOrSliceProjectFn === 'function'
    ) {
      const state: Partial<T> = {};
      state[keyOrStateOrProjectState] = stateOrSliceProjectFn(
        this.accumulator.state
      );
      this.accumulator.nextSlice(state);
      return;
    }

    throw new Error('wrong params passed to set');
  }

  /**
   * @description
   * Connect an `Observable<Partial<T>>` to the state `T`.
   * Any change emitted by the source will get merged into the state.
   * Subscription handling is done automatically.
   *
   * @example
   * const sliceToAdd$ = interval(250).pipe(mapTo({
   *   bar: 5,
   *   foo: 'foo'
   * });
   * state.connect(sliceToAdd$);
   * // every 250ms the properties bar and foo get updated due to the emission of sliceToAdd$
   *
   * // Additionally you can provide a `projectionFunction` to access the current state object and do custom mappings.
   *
   * const sliceToAdd$ = interval(250).pipe(mapTo({
   *   bar: 5,
   *   foo: 'foo'
   * });
   * state.connect(sliceToAdd$, (state, slice) => state.bar += slice.bar);
   * // every 250ms the properties bar and foo get updated due to the emission of sliceToAdd$. Bar will increase by
   * // 5 due to the projectionFunction
   */
  connect(inputOrSlice$: Observable<Partial<T>>): void;

  /**
   * @description
   * Connect an `Observable<V>` to the state `T`.
   * Any change emitted by the source will get forwarded to to project function and merged into the state.
   * Subscription handling is done automatically.
   *
   * You have to provide a `projectionFunction` to access the current state object and do custom mappings.
   *
   * @example
   * const sliceToAdd$ = interval(250);
   * state.connect(sliceToAdd$, (s, v) => ({bar: v}));
   * // every 250ms the property bar get updated due to the emission of sliceToAdd$
   *
   */
  connect<V>(
    inputOrSlice$: Observable<V>,
    projectFn: ProjectStateReducer<T, V>
  ): void;
  /**
   *
   * @description
   * Connect an `Observable<T[K]>` source to a specific property `K` in the state `T`. Any emitted change will update
   * this
   * specific property in the state.
   * Subscription handling is done automatically.
   *
   * @example
   * const myTimer$ = interval(250);
   * state.connect('timer', myTimer$);
   * // every 250ms the property timer will get updated
   */
  connect<K extends keyof T>(key: K, slice$: Observable<T[K]>): void;
  /**
   *
   * @description
   * Connect an `Observable<V>` source to a specific property in the state. Additionally you can provide a
   * `projectionFunction` to access the current state object on every emission of your connected `Observable`.
   * Any change emitted by the source will get merged into the state.
   * Subscription handling is done automatically.
   *
   * @example
   * const myTimer$ = interval(250);
   * state.connect('timer', myTimer$, (state, timerChange) => state.timer += timerChange);
   * // every 250ms the property timer will get updated
   */
  connect<K extends keyof T, V>(
    key: K,
    input$: Observable<V>,
    projectSliceFn: ProjectValueReducer<T, K, V>
  ): void;
  /**
   * @internal
   */
  connect<K extends keyof T, V>(
    keyOrInputOrSlice$: K | Observable<Partial<T> | V>,
    projectOrSlices$?: ProjectStateReducer<T, V> | Observable<T[K]>,
    projectValueFn?: ProjectValueReducer<T, K, V>
  ): void {
    if (
      isObservable<Partial<T>>(keyOrInputOrSlice$) &&
      projectOrSlices$ === undefined &&
      projectValueFn === undefined
    ) {
      this.accumulator.nextSliceObservable(keyOrInputOrSlice$);
      return;
    }

    if (
      isObservable<V>(keyOrInputOrSlice$) &&
      typeof projectOrSlices$ === 'function' &&
      !isObservable<T[K]>(projectOrSlices$) &&
      projectValueFn === undefined
    ) {
      const project = projectOrSlices$;
      const slice$ = keyOrInputOrSlice$.pipe(
        map((v) => project(this.get(), v))
      );
      this.accumulator.nextSliceObservable(slice$);
      return;
    }

    if (
      isKeyOf<T>(keyOrInputOrSlice$) &&
      isObservable<T[K]>(projectOrSlices$) &&
      projectValueFn === undefined
    ) {
      const key = keyOrInputOrSlice$;
      const slice$ = projectOrSlices$.pipe(
        map((value) => ({ ...{}, [key]: value }))
      );
      this.accumulator.nextSliceObservable(slice$);
      return;
    }

    if (
      isKeyOf<T>(keyOrInputOrSlice$) &&
      isObservable<V>(projectOrSlices$) &&
      typeof projectValueFn === 'function'
    ) {
      const key = keyOrInputOrSlice$;
      const slice$ = projectOrSlices$.pipe(
        map((value) => ({ ...{}, [key]: projectValueFn(this.get(), value) }))
      );
      this.accumulator.nextSliceObservable(slice$);
      return;
    }

    throw new Error('wrong params passed to connect');
  }

  /**
   * @description
   * returns the state as cached and distinct `Observable<T>`. This way you don't have to think about **late
   * subscribers**,
   * **multiple subscribers** or **multiple emissions** of the same value
   *
   * @example
   * const state$ = state.select();
   * state$.subscribe(state => doStuff(state));
   *
   * @returns Observable<T>
   */
  select(): Observable<T>;

  /**
   * @description
   * returns the state as cached and distinct `Observable<A>`. Accepts arbitrary
   * [rxjs operators](https://rxjs-dev.firebaseapp.com/guide/operators) to enrich the selection with reactive composition.
   *
   * @example
   * const profilePicture$ = state.select(
   *  pluck('profilePicture'),
   *  switchMap(profilePicture => mapImageAsync(profilePicture))
   * );
   * @param op { OperatorFunction<T, A> }
   * @returns Observable<A>
   */
  select<A = T>(op: OperatorFunction<T, A>): Observable<A>;
  /**
   * @internal
   */
  select<A = T, B = A>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>
  ): Observable<B>;
  /**
   * @internal
   */
  select<A = T, B = A, C = B>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>
  ): Observable<C>;
  /**
   * @internal
   */
  select<A = T, B = A, C = B, D = C>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
    op4: OperatorFunction<C, D>
  ): Observable<D>;
  /**
   * @internal
   */
  select<A = T, B = A, C = B, D = C, E = D>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
    op4: OperatorFunction<C, D>,
    op5: OperatorFunction<D, E>
  ): Observable<E>;
  /**
   * @description
   * Access a single property of the state by providing keys.
   * Returns a single property of the state as cached and distinct `Observable<T[K1]>`.
   *
   * @example
   * // Access a single property
   *
   * const bar$ = state.select('bar');
   *
   * // Access a nested property
   *
   * const foo$ = state.select('bar', 'foo');
   *
   * @return Observable<T[K1]>
   */
  select<K1 extends keyof T>(k1: K1): Observable<T[K1]>;
  /**
   * @internal
   */
  select<K1 extends keyof T, K2 extends keyof T[K1]>(
    k1: K1,
    k2: K2
  ): Observable<T[K1][K2]>;
  /**
   * @internal
   */
  select<
    K1 extends keyof T,
    K2 extends keyof T[K1],
    K3 extends keyof T[K1][K2]
  >(k1: K1, k2: K2, k3: K3): Observable<T[K1][K2][K3]>;
  /**
   * @internal
   */
  select<
    K1 extends keyof T,
    K2 extends keyof T[K1],
    K3 extends keyof T[K1][K2],
    K4 extends keyof T[K1][K2][K3]
  >(k1: K1, k2: K2, k3: K3, k4: K4): Observable<T[K1][K2][K3][K4]>;
  /**
   * @internal
   */
  select<
    K1 extends keyof T,
    K2 extends keyof T[K1],
    K3 extends keyof T[K1][K2],
    K4 extends keyof T[K1][K2][K3],
    K5 extends keyof T[K1][K2][K3][K4]
  >(k1: K1, k2: K2, k3: K3, k4: K4, k5: K5): Observable<T[K1][K2][K3][K4][K5]>;
  /**
   * @internal
   */
  select<
    K1 extends keyof T,
    K2 extends keyof T[K1],
    K3 extends keyof T[K1][K2],
    K4 extends keyof T[K1][K2][K3],
    K5 extends keyof T[K1][K2][K3][K4],
    K6 extends keyof T[K1][K2][K3][K4][K5]
  >(
    k1: K1,
    k2: K2,
    k3: K3,
    k4: K4,
    k5: K5,
    k6: K6
  ): Observable<T[K1][K2][K3][K4][K5][K6]>;
  /**
   * @internal
   */
  select<R>(
    ...opOrMapFn: OperatorFunction<T, R>[] | string[]
  ): Observable<T | R> {
    if (!opOrMapFn || opOrMapFn.length === 0) {
      return this.accumulator.state$.pipe(stateful());
    } else if (isStringArrayGuard(opOrMapFn)) {
      return this.accumulator.state$.pipe(stateful(pluck(...opOrMapFn)));
    } else if (isOperateFnArrayGuard(opOrMapFn)) {
      return this.accumulator.state$.pipe(
        stateful(pipeFromArray(opOrMapFn))
      ) as any;
    }
    throw new Error('wrong params passed to select');
  }

  /**
   * @description
   * Manages side-effects of your state. Provide an `Observable<any>` **side-effect** and an optional
   * `sideEffectFunction`.
   * Subscription handling is done automatically.
   *
   * @example
   * // Directly pass an observable side-effect
   * const localStorageEffect$ = changes$.pipe(
   *  tap(changes => storeChanges(changes))
   * );
   * state.hold(localStorageEffect$);
   *
   * // Pass an additional `sideEffectFunction`
   *
   * const localStorageEffectFn = changes => storeChanges(changes);
   * state.hold(changes$, localStorageEffectFn);
   *
   * @param {Observable<S>} obsOrObsWithSideEffect
   * @param {function} [sideEffectFn]
   */
  hold<S>(
    obsOrObsWithSideEffect: Observable<S>,
    sideEffectFn?: (arg: S) => void
  ): void {
    const sideEffect = obsOrObsWithSideEffect.pipe(catchError((e) => EMPTY));
    if (typeof sideEffectFn === 'function') {
      this.effectObservable.nextEffectObservable(
        sideEffect.pipe(tap(sideEffectFn))
      );
      return;
    }
    this.effectObservable.nextEffectObservable(sideEffect);
  }

  /**
   * @internal
   */
  subscribe(): Unsubscribable {
    const subscription = new Subscription();
    subscription.add(this.accumulator.subscribe());
    subscription.add(this.effectObservable.subscribe());
    return subscription;
  }
}

import { noop, UnaryFunction } from 'rxjs';

export function pipeFromArray<T, R>(
  fns: Array<UnaryFunction<T, R>>
): UnaryFunction<T, R> {
  if (!fns) {
    return noop as UnaryFunction<any, any>;
  }

  if (fns.length === 1) {
    return fns[0];
  }

  return function piped(input: T): R {
    return fns.reduce(
      (prev: any, fn: UnaryFunction<T, R>) => fn(prev),
      input as any
    );
  };
}

export function safePluck<T extends object, K1 extends keyof T>(
  stateObject: T,
  keys: K1 | [K1]
): T[K1];

export function safePluck<
  T extends object,
  K1 extends keyof T,
  K2 extends keyof T[K1]
>(stateObject: T, keys: [K1, K2]): T[K1][K2];

export function safePluck<
  T extends object,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2]
>(stateObject: T, keys: [K1, K2, K3]): T[K1][K2][K3];

export function safePluck<
  T extends object,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3]
>(stateObject: T, keys: [K1, K2, K3, K4]): T[K1][K2][K3][K4];

export function safePluck<
  T extends object,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3],
  K5 extends keyof T[K1][K2][K3][K4]
>(stateObject: T, keys: [K1, K2, K3, K4, K5]): T[K1][K2][K3][K4][K5];

export function safePluck<
  T extends object,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3],
  K5 extends keyof T[K1][K2][K3][K4],
  K6 extends keyof T[K1][K2][K3][K4][K5]
>(
  stateObject: T,
  keys:
    | [K1]
    | [K1, K2]
    | [K1, K2, K3]
    | [K1, K2, K3, K4]
    | [K1, K2, K3, K4, K5]
    | [K1, K2, K3, K4, K5, K6]
): T[K1][K2][K3][K4][K5][K6];

export function safePluck<
  T extends object,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3],
  K5 extends keyof T[K1][K2][K3][K4],
  K6 extends keyof T[K1][K2][K3][K4][K5]
>(
  stateObject: T,
  keys:
    | [K1]
    | [K1, K2]
    | [K1, K2, K3]
    | [K1, K2, K3, K4]
    | [K1, K2, K3, K4, K5]
    | [K1, K2, K3, K4, K5, K6]
):
  | T[K1]
  | T[K1][K2]
  | T[K1][K2][K3]
  | T[K1][K2][K3][K4]
  | T[K1][K2][K3][K4][K5]
  | T[K1][K2][K3][K4][K5][K6]
  | null
  | undefined {
  // needed to match null and undefined conventions of RxAngular core components
  // safePluck(null) -> return null
  // safePluck(undefined) -> return undefined
  // safePluck(obj, ['wrongKey']) -> return undefined
  // safePluck(obj, ['correctKey']) -> return value of key
  // safePluck(obj, '') -> return undefined
  // safePluck(obj, null) -> return undefined
  if (!isDefined(stateObject)) {
    return stateObject;
  }
  if (!isDefined(keys)) {
    return undefined;
  }
  // sanitize keys -> keep only valid keys (string, number, symbol)
  const keysArr = (Array.isArray(keys) ? keys : [keys]).filter((k) =>
    isKeyOf<T>(k)
  );
  if (
    keysArr.length === 0 ||
    !isObjectGuard(stateObject) ||
    Object.keys(stateObject).length === 0
  ) {
    return undefined;
  }
  let prop = stateObject[keysArr.shift() as K1];

  keysArr.forEach((key) => {
    if (isObjectGuard(prop) && isKeyOf(key)) {
      prop = prop[key];
    }
  });
  return prop;
}

export function isPromiseGuard<T>(value: unknown): value is Promise<T> {
  return (
    !!value &&
    typeof (<any>value).subscribe !== 'function' &&
    typeof (value as any).then === 'function'
  );
}

export function isOperateFnArrayGuard<T, R = T>(
  op: any[]
): op is OperatorFunction<T, R>[] {
  if (!Array.isArray(op)) {
    return false;
  }
  return op.length > 0 && op.every((i: any) => typeof i === 'function');
}

export function isStringArrayGuard(op: any[]): op is string[] {
  if (!Array.isArray(op)) {
    return false;
  }
  return op.length > 0 && op.every((i: any) => typeof i === 'string');
}

export function isIterableGuard<T>(obj: unknown): obj is Array<T> {
  if (obj === null || obj === undefined) {
    return false;
  }
  return typeof (obj as any)[Symbol.iterator] === 'function';
}

export function isKeyOf<O>(k: unknown): k is keyof O {
  return (
    !!k &&
    (typeof k === 'string' || typeof k === 'symbol' || typeof k === 'number')
  );
}

export function isObjectGuard(obj: unknown): obj is object {
  return !!obj && typeof obj === 'object' && !Array.isArray(obj);
}

export function isDefined(val: unknown): val is NonNullable<any> {
  return val !== null && val !== undefined;
}
import {
  BehaviorSubject,
  ConnectableObservable,
  merge,
  queueScheduler,
  Subject,
} from 'rxjs';
import {
  distinctUntilChanged,
  mergeAll,
  observeOn,
  publish,
  publishReplay,
  scan,
  withLatestFrom,
} from 'rxjs/operators';

export type AccumulationFn = <T>(st: T, sl: Partial<T>) => T;

const defaultAccumulator: AccumulationFn = <T>(st: T, sl: Partial<T>): T => {
  return { ...st, ...sl };
};

interface Accumulator<T> extends Subscribable<T> {
  state: T;
  state$: Observable<T>;
  signal$: Observable<T>;
  nextSlice: (stateSlice: Partial<T>) => void;
  nextSliceObservable: (state$: Observable<Partial<T>>) => void;
  nextAccumulator: (fn: AccumulationFn) => void;
}

export function createAccumulationObservable<T extends object>(
  stateObservables = new Subject<Observable<Partial<T>>>(),
  stateSlices = new Subject<Partial<T>>(),
  accumulatorObservable = new BehaviorSubject(defaultAccumulator)
): Accumulator<T> {
  const signal$ = merge(
    stateObservables.pipe(
      distinctUntilChanged(),
      mergeAll(),
      observeOn(queueScheduler)
    ),
    stateSlices.pipe(observeOn(queueScheduler))
  ).pipe(
    withLatestFrom(accumulatorObservable.pipe(observeOn(queueScheduler))),
    scan(
      (state, [slice, stateAccumulator]) => stateAccumulator(state, slice),
      {} as T
    ),
    tap(
      (newState) => (compositionObservable.state = newState),
      (error) => console.error(error)
    ),
    // @Notice We catch the error here as it get lost in between `publish` and `publishReplay`. We return empty to
    catchError((e) => EMPTY),
    publish()
  );
  const state$: Observable<T> = signal$.pipe(publishReplay(1));
  const compositionObservable: Accumulator<T> = {
    state: {} as T,
    signal$,
    state$,
    nextSlice,
    nextSliceObservable,
    nextAccumulator,
    subscribe,
  };

  // ======

  return compositionObservable;

  // ======

  function nextAccumulator(accumulatorFn: AccumulationFn): void {
    accumulatorObservable.next(accumulatorFn);
  }

  function nextSlice(stateSlice: Partial<T>): void {
    stateSlices.next(stateSlice);
  }

  function nextSliceObservable(stateObservable: Observable<Partial<T>>): void {
    stateObservables.next(stateObservable);
  }

  function subscribe(): Subscription {
    const sub = (
      compositionObservable.signal$ as ConnectableObservable<T>
    ).connect();
    sub.add(
      (compositionObservable.state$ as ConnectableObservable<T>).connect()
    );
    sub.add(() => {
      accumulatorObservable.complete();
      stateObservables.complete();
      stateSlices.complete();
    });
    return sub;
  }
}

export function createSideEffectObservable<T>(
  stateObservables = new Subject<Observable<T>>()
): {
  effects$: Observable<T>;
  nextEffectObservable: (effect$: Observable<T>) => void;
} & Subscribable<T> {
  const effects$: Observable<T> = merge(
    stateObservables.pipe(mergeAll(), observeOn(queueScheduler))
  );

  function nextEffectObservable(effect$: Observable<T>): void {
    stateObservables.next(effect$);
  }

  function subscribe(): Subscription {
    return effects$.subscribe();
  }

  return {
    effects$,
    nextEffectObservable,
    subscribe,
  };
}

import { MonoTypeOperatorFunction } from 'rxjs';
import { filter, shareReplay } from 'rxjs/operators';

/**
 * @description
 *
 * As the name `stateful` implies this operator is useful when you process an Observable which maintains state.
 *
 * Maintaining state as an `Observable` source comes with a handful of repetitive as well as use case specific tasks.
 *
 * It acts like the Observables `pipe` method.
 * It accepts RxJS operators and composes them like `Observable#pipe` and the standalone `pipe` method.
 *
 * Furthermore, it takes care of the above mentioned repetitive tasks as listed below.
 *
 * You will always (aka repetitive) want to ensure that:
 * - only distinct state changes are emitted
 * - only defined values are emitted (filter out undefined, which ensures lazy state)
 * - share and replay custom operations for multiple subscribers (saves performance)
 *
 * You will sometimes (aka situational) need:
 * - a subset of the state (derivations)
 * - compose the state with other Observables or change the Observables behaviour
 *
 *
 * @example
 * import { Observable } from 'rxjs';
 * import { map } from 'rxjs/operators';
 * import { stateful } from 'rx-angular/state';
 *
 * const state$: Observable<{ name: string; items: string[] }>;
 * const derivation$ = state$.pipe(
 *   stateful(
 *     map(state => state.list.length),
 *     filter(length => length > 3)
 *   )
 * );
 *
 * @param {OperatorFunction<T, A>} op - one or multiple passed operator comma separated
 * @return OperatorFunction<T, A>
 *
 * @docsPage stateful
 * @docsCategory operators
 */
export function stateful<T>(): MonoTypeOperatorFunction<T>;
/**
 * @internal
 */
export function stateful<T, A>(
  op: OperatorFunction<T, A>
): OperatorFunction<T, A>;
/**
 * @internal
 */
export function stateful<T, A, B>(
  op1: OperatorFunction<T, A>,
  op2: OperatorFunction<A, B>
): OperatorFunction<T, B>;
/**
 * @internal
 */
export function stateful<T, A, B, C>(
  op1: OperatorFunction<T, A>,
  op2: OperatorFunction<A, B>,
  op3: OperatorFunction<B, C>
): OperatorFunction<T, C>;
/**
 * @internal
 */
export function stateful<T, A, B, C, D>(
  op1: OperatorFunction<T, A>,
  op2: OperatorFunction<A, B>,
  op3: OperatorFunction<B, C>,
  op4: OperatorFunction<C, D>
): OperatorFunction<T, D>;
/**
 * @internal
 */
export function stateful<T, A, B, C, D, E>(
  op1: OperatorFunction<T, A>,
  op2: OperatorFunction<A, B>,
  op3: OperatorFunction<B, C>,
  op4: OperatorFunction<C, D>,
  op5: OperatorFunction<D, E>
): OperatorFunction<T, E>;
/**
 * @description
 *
 * As it acts like the Observables `pipe` method, it accepts one or many RxJS operators as params.
 *
 * @example
 * import { Observable } from 'rxjs';
 * import { map } from 'rxjs/operators';
 * import { stateful } from 'rx-angular/state';
 *
 * const state$: Observable<{ name: string; items: string[] }>;
 * const derivation$ = state$.pipe(
 *   stateful(
 *     map(state => state.list.length),
 *     filter(length => length > 3)
 *   )
 * );
 *
 * @param {OperatorFunction<T, A>} op - one or multiple passed operator comma separated
 *
 * @docsPage stateful
 * @docsCategory operators
 */
export function stateful<T, R>(
  ...optionalDerive: OperatorFunction<T, R>[]
): OperatorFunction<T, T | R> {
  return (s: Observable<T>): Observable<T | R> => {
    return s.pipe(
      // distinct same base-state objects (e.g. a default emission of default switch cases, incorrect mutable handling
      // of data) @TODO evaluate benefits vs. overhead
      distinctUntilChanged(),
      // CUSTOM LOGIC HERE
      (o: Observable<T>): Observable<T | R> => {
        if (isOperateFnArrayGuard(optionalDerive)) {
          return o.pipe(pipeFromArray(optionalDerive)) as any;
        }
        return o;
      },
      // initial emissions, undefined is no base-state, pollution with skip(1)
      filter((v) => v !== undefined),
      // distinct same derivation value
      distinctUntilChanged(),
      // reuse custom operations result for multiple subscribers and reemit the last calculated value.
      shareReplay({ bufferSize: 1, refCount: true })
    );
  };
}

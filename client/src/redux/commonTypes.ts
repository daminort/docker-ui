
interface Action<T extends string> {
  type: T;
}

interface ActionWithPayload<T extends string, P> extends Action<T>{
  payload: P;
}

type EmptyPayload = {};

type FunctionType = (...args: any[]) => any;
type ActionCreatorMapObject = { [actionCreator: string]: FunctionType };

export type ActionUnion<A extends ActionCreatorMapObject> = ReturnType<A[keyof A]>;

// export function createAction<T extends string>(type: T): Action<T>;
export function createAction<T extends string>(type: T): ActionWithPayload<T, EmptyPayload>;
export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>;
export function createAction<T extends string, P>(type: T, payload?: P) {
  return payload === undefined ? { type, payload: {} } : { type, payload };
}

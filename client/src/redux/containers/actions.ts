import {
  ContainersActionTypes,
  ContainerRecord,
  ContainersUI,
} from './types';

export const containersActions = {
  listReload: () => ({
    type: ContainersActionTypes.listReload,
    payload: {},
  } as const),
  listRefresh: (list: ContainerRecord[]) => ({
    type: ContainersActionTypes.listRefresh,
    payload: {
      list,
    },
  } as const),
  uiMerge: (ui: ContainersUI) => ({
    type: ContainersActionTypes.uiMerge,
    payload: {
      ui,
    },
  } as const),
};

type InferActionTypes<T> = T extends { [key: string]: infer U } ? U : never;

export type ContainersActions = ReturnType<InferActionTypes<typeof containersActions>>;

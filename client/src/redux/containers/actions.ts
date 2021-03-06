import { ActionUnion, createAction } from '../commonTypes';
import {
  ContainersActionTypes,
  ContainerRecord,
  ContainersUI,
} from './types';

export const containersActions = {
  listReload: () => createAction(ContainersActionTypes.listReload),
  listRefresh: (list: ContainerRecord[]) => createAction(ContainersActionTypes.listRefresh, {
    list,
  }),
  itemSelect: (itemID: string) => createAction(ContainersActionTypes.itemSelect, {
    itemID,
  }),
  uiMerge: (ui: ContainersUI) => createAction(ContainersActionTypes.uiMerge, {
    ui,
  }),
};

export type ContainersActions = ActionUnion<typeof containersActions>;

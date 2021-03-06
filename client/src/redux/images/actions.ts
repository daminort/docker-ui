import { ActionUnion, createAction } from '../commonTypes';
import {
  ImagesActionTypes,
  ImageRecord,
  ImagesUI,
} from './types';

export const imagesActions = {
  listReload: () => createAction(ImagesActionTypes.listReload),
  listRefresh: (list: ImageRecord[]) => createAction(ImagesActionTypes.listRefresh, {
    list,
  }),
  itemSelect: (itemID: string) => createAction(ImagesActionTypes.itemSelect, {
    itemID,
  }),
  uiMerge: (ui: ImagesUI) => createAction(ImagesActionTypes.uiMerge, {
    ui,
  }),
};

export type ImagesActions = ActionUnion<typeof imagesActions>;

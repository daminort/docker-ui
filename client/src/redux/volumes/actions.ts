import { ActionUnion, createAction } from '../commonTypes';
import {
  VolumesActionTypes,
  VolumeRecord,
  VolumesUI,
} from './types';

export const volumesActions = {
  listReload: () => createAction(VolumesActionTypes.listReload),
  listRefresh: (list: VolumeRecord[]) => createAction(VolumesActionTypes.listRefresh, {
    list,
  }),
  uiMerge: (ui: VolumesUI) => createAction(VolumesActionTypes.uiMerge, {
    ui,
  }),
};

export type VolumesActions = ActionUnion<typeof volumesActions>;

export enum VolumesActionTypes {
  listReload = '@volumes/listReload',
  listRefresh = '@volumes/listRefresh',
  uiMerge = '@volumes/uiMerge',
};

export interface VolumeRecord {
  driver: string,
  volumeName: string,
};

export interface VolumesUI {
  loading?: boolean;
};

export interface VolumesState {
  list: VolumeRecord[];
  ui: VolumesUI,
};

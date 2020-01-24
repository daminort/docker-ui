export enum VolumesActionTypes {
  listReload = '@volumes/listReload',
  listRefresh = '@volumes/listRefresh',
  itemSelect = '@volumes/itemSelect',
  uiMerge = '@volumes/uiMerge',
}

export interface VolumeRecord {
  driver: string;
  volumeName: string;
  shortName: string;
}

export interface VolumesUI {
  loading?: boolean;
}

export interface VolumesState {
  list: VolumeRecord[];
  ui: VolumesUI,
}

export enum ImagesActionTypes {
  listReload = '@images/listReload',
  listRefresh = '@images/listRefresh',
  uiMerge = '@images/uiMerge',
}

export interface ImageRecord {
  repository: string;
  tag: string;
  imageID: string;
  created: string;
  size: string;
  shortID: string;
}

export interface ImagesUI {
  loading?: boolean;
}

export interface ImagesState {
  list: ImageRecord[];
  ui: ImagesUI,
}

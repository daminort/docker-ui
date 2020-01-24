export enum ContainersActionTypes {
  listReload = '@containers/listReload',
  listRefresh = '@containers/listRefresh',
  uiMerge = '@containers/uiMerge',
}

export interface ContainerRecord {
  containerID: string;
  imageID: string;
  command: string;
  created: string;
  status: string;
  ports: string;
  name: string;
  size: string;
}

export interface ContainersUI {
  loading?: boolean;
}

export interface ContainersState {
  list: ContainerRecord[];
  ui: ContainersUI,
}

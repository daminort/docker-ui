import { ItemType, InfoType } from '../../enums/app';

export enum AppActionTypes {
  itemTypeRefresh = '@app/itemTypeRefresh',
  itemIDRefresh = '@app/itemIDRefresh',
  infoTypeRefresh = '@app/infoTypeRefresh',
  resetTypes = '@app/resetTypes',
}

export interface AppState {
  itemType: ItemType;
  itemID: string;
  infoType: InfoType;
}

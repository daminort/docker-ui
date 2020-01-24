import { InfoType, ItemType } from '../../enums/app';
import { AppActionTypes, AppState } from './types';
import { AppActions } from './actions';

const initState: AppState = {
  itemType: ItemType.none,
  itemID: '',
  infoType: InfoType.none,
};

export function appReducer(state: AppState = initState, action: AppActions): AppState {
  const { type, payload } = action;
  switch (type) {
    case AppActionTypes.itemTypeRefresh: {
      if ('itemType' in payload) {
        return {
          ...state,
          itemType: payload.itemType,
        };
      }
      break;
    }
    case AppActionTypes.itemIDRefresh: {
      if ('itemID' in payload) {
        return {
          ...state,
          itemID: payload.itemID,
        };
      }
      break;
    }
    case AppActionTypes.infoTypeRefresh: {
      if ('infoType' in payload) {
        return {
          ...state,
          infoType: payload.infoType,
        };
      }
      break;
    }
    case AppActionTypes.resetTypes: {
      return {
        ...state,
        itemType: ItemType.none,
        infoType: InfoType.none,
      };
    }
    default: {
      return state;
    }
  }

  return state;
}

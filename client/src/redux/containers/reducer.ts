import {
  ContainersActionTypes,
  ContainersState,
} from './types';
import { ContainersActions } from './actions';

const initState: ContainersState = {
  list: [],
  ui: {
    loading: false,
  },
};

export function containersReducer(state: ContainersState, action: ContainersActions): ContainersState {
  const { type, payload } = action;
  switch (type) {
    case ContainersActionTypes.listRefresh: {
      if ('list' in payload) {
        return {
          ...state,
          list: payload.list,
        };
      }
      break;
    }
    case ContainersActionTypes.uiMerge: {
      if ('ui' in payload) {
        return {
          ...state,
          ui: {
            ...state.ui,
            ...payload.ui,
          },
        };
      }
      break;
    }
    default: {
      return state;
    }
  };

  return state;
}

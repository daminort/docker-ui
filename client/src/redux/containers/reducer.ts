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
      return {
        ...state,
        list: payload.list,
      };
    }
    case ContainersActionTypes.uiMerge: {
      return {
        ...state,
        ui: {
          ...state.ui,
          ...payload.ui,
        },
      };
    }
    default: {
      return state;
    }
  }
}

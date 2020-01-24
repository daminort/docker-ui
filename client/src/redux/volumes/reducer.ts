import { VolumesActionTypes, VolumesState } from './types';
import { VolumesActions } from './actions';

const initState: VolumesState = {
  list: [],
  ui: {
    loading: false,
  },
};

export function volumesReducer(state: VolumesState = initState, action: VolumesActions): VolumesState {
  const { type, payload } = action;
  switch (type) {
    case VolumesActionTypes.listRefresh: {
      if ('list' in payload) {
        return {
          ...state,
          list: payload.list,
        };
      }
      break;
    }
    case VolumesActionTypes.uiMerge: {
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

import { ImagesActionTypes, ImagesState } from './types';
import { ImagesActions } from './actions';

const initState: ImagesState = {
  list: [],
  ui: {
    loading: false,
  },
};

export function imagesReducer(state: ImagesState = initState, action: ImagesActions): ImagesState {
  const { type, payload } = action;
  switch (type) {
    case ImagesActionTypes.listRefresh: {
      if ('list' in payload) {
        return {
          ...state,
          list: payload.list,
        };
      }
      break;
    }
    case ImagesActionTypes.uiMerge: {
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
  }

  return state;
}

import { combineReducers } from 'redux';

import { containersReducer } from './containers/reducer';
import { imagesReducer } from './images/reducer';

export const rootReducer = combineReducers({
  Containers: containersReducer,
  Images: imagesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

import { combineReducers } from 'redux';

import { appReducer } from './app/reducer';
import { containersReducer } from './containers/reducer';
import { imagesReducer } from './images/reducer';
import { volumesReducer } from './volumes/reducer';

export const rootReducer = combineReducers({
  App: appReducer,
  Containers: containersReducer,
  Images: imagesReducer,
  Volumes: volumesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

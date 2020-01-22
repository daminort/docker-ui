import { combineReducers } from 'redux';
import { containersReducer } from './containers/reducer';

export const rootReducer = combineReducers({
  Containers: containersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

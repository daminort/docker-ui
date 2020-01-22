import { combineReducers } from 'redux';
import { containersReducer } from './containers/reducer';

export const rootReducer = combineReducers({
  Containers: containersReducer,
});

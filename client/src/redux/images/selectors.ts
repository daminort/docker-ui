import { createSelector } from 'reselect';

import { RootState } from '../rootReducer';

const list = (state: RootState) => state.Images.list;
const ui = (state: RootState) => state.Images.ui;

export const selectList = createSelector(
  [list],
  (list) => list,
);

export const selectUI = createSelector(
  [ui],
  (ui) => ui,
);

export const selectCount = createSelector(
  [selectList],
  (list) => list.length,
);

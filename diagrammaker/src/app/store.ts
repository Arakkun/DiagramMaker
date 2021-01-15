import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import elementsReducer from '../features/elements/elementsSlice';
import linksReducer from '../features/elements/linksSlice';
import tabReducer from '../features/navigation/tabSlice';

export const store = configureStore({
  reducer: {
    tab: tabReducer,
    elements: elementsReducer,
    links: linksReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

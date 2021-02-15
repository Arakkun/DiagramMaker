import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface TabState {
  value: string;
}

const initialState: TabState = {
  value: "elements-manager"
};

export const tabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    changeTab: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changeTab } = tabSlice.actions;

export const selectTab = (state: RootState) => state.tab.value;

export default tabSlice.reducer;

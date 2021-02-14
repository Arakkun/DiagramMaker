import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { EntityStyle } from './EntityElements';
import { LinkStyle } from './LinkElements';

export enum DiagramType {
  Topological = "topological"
}

export enum Orientation{
  toLeft = "toLeft",
  toRight = "toRight",
  toUp = "toUp",
  toDown = "toDown"
}
export enum ColorationStyle{
  origin = "Origin of Link",
  destination = "Destination of Link"
}

export interface DiagramSettingsState {
  type: DiagramType,
  entitySize: number,
  padding: number,
  orientation: Orientation,
  entityStyle: EntityStyle,
  linkStyle: LinkStyle,
  coloration: Record<string, string> | null,
  from: ColorationStyle,
  changed: boolean
}

const initialState: DiagramSettingsState = {
  type: DiagramType.Topological,
  entitySize:100,
  padding: 40,
  orientation: Orientation.toRight,
  entityStyle: EntityStyle.Square,
  linkStyle: LinkStyle.Linear,
  coloration: null,
  from: ColorationStyle.origin,
  changed: true
};

export const diagramSettingsSlice = createSlice({
  name: 'diagramSettings',
  initialState,
  reducers: {
    changeType: (state, action) => {
      state.type = action.payload;
      state.changed = true;
    },
    changeSize: (state, action) => {
      state.entitySize = action.payload;
      state.changed = true;
    },
    changePadding: (state, action) => {
      state.padding = action.payload;
      state.changed = true;
    },
    changeOrientation: (state, action) => {
      state.orientation = action.payload;
      state.changed = true;
    },
    changeEntityStyle: (state, action) => {
      state.entityStyle = action.payload;
      state.changed = true;
    },
    changeLinkStyle: (state, action) => {
      state.linkStyle = action.payload;
      state.changed = true;
    },
    changeColoration: (state, action) => {
      state.coloration = action.payload;
      state.changed = true;
    },
    changeFrom: (state, action) =>{
      state.from = action.payload;
      state.changed = true;
    },
    diagramPrinted: (state, _) => {
      state.changed = false
    }
  },
});

export const { changeType, changeSize, changePadding, changeOrientation, changeEntityStyle, changeLinkStyle, changeColoration, changeFrom, diagramPrinted } = diagramSettingsSlice.actions;

export const selectType = (state: RootState) => state.diagramSettings.type;
export const selectEntitySize = (state: RootState) => state.diagramSettings.entitySize;
export const selectPadding = (state: RootState) => state.diagramSettings.padding;
export const selectOrientation = (state: RootState) => state.diagramSettings.orientation;
export const selectEntityStyle = (state: RootState) => state.diagramSettings.entityStyle;
export const selectLinkStyle = (state: RootState) => state.diagramSettings.linkStyle;
export const selectColoration = (state: RootState) => state.diagramSettings.coloration;
export const selectFrom = (state: RootState) => state.diagramSettings.from;
export const selectChanged = (state:RootState) => state.diagramSettings.changed;
export const selectWholeSettings = (state:RootState) => state.diagramSettings

export default diagramSettingsSlice.reducer;

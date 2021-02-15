import { createSlice } from '@reduxjs/toolkit';
import Color from 'color';
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
export enum ColorationOrigin{
  origin = "Origin of Link",
  destination = "Destination of Link"
}

export enum ColorationStyle{
  Random = "Random",
  StyleA = "Based on Style A",
  StyleB = "Based on Style B",
  Entity = "Based on Entity"
}

export interface colorAssign{
  [id:string]:Color
}
export interface DiagramSettingsState {
  type: DiagramType,
  entitySize: number,
  padding: number,
  orientation: Orientation,
  entityStyle: EntityStyle,
  linkStyle: LinkStyle,
  colorationStyle: ColorationStyle,
  from: ColorationOrigin,
  changed: boolean,
  colors: colorAssign
}



const initialState: DiagramSettingsState = {
  type: DiagramType.Topological,
  entitySize:100,
  padding: 40,
  orientation: Orientation.toRight,
  entityStyle: EntityStyle.Square,
  linkStyle: LinkStyle.Linear,
  colorationStyle: ColorationStyle.Random,
  from: ColorationOrigin.origin,
  changed: true,
  colors: {}
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
    changeColorationStyle: (state, action) => {
      state.colorationStyle = action.payload
      state.changed = true;
    },
    changeColor: (state, action) => {
      state.colors = {...state.colors, ...action.payload}
      state.changed = true;
    },
    changeColorList: (state, action) => {
      state.colors =  action.payload
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

export const { changeType, changeSize, changePadding, changeOrientation, changeEntityStyle, changeLinkStyle, changeColorationStyle, 
  changeFrom, diagramPrinted, changeColor, changeColorList } = diagramSettingsSlice.actions;

export const selectType = (state: RootState) => state.diagramSettings.type;
export const selectEntitySize = (state: RootState) => state.diagramSettings.entitySize;
export const selectPadding = (state: RootState) => state.diagramSettings.padding;
export const selectOrientation = (state: RootState) => state.diagramSettings.orientation;
export const selectEntityStyle = (state: RootState) => state.diagramSettings.entityStyle;
export const selectLinkStyle = (state: RootState) => state.diagramSettings.linkStyle;
export const selectColoration = (state: RootState) => state.diagramSettings.colorationStyle;
export const selectFrom = (state: RootState) => state.diagramSettings.from;
export const selectChanged = (state:RootState) => state.diagramSettings.changed;
export const selectColors = (state:RootState) => state.diagramSettings.colors;
export const selectWholeSettings = (state:RootState) => state.diagramSettings

export default diagramSettingsSlice.reducer;

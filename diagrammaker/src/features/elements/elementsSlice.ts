import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

type Element = {
    name: string,
    entityId: string,
    imgLink: string,
    styleTypeA: string,
    styleTypeB: string
}

const elementsAdapter = createEntityAdapter<Element>({
    selectId: (entity) => entity.entityId,
    sortComparer: (a,b) => a.name.localeCompare(b.name),
})

const elementsSlice = createSlice({
    name: 'elements',
    initialState: elementsAdapter.getInitialState(),
    reducers:{
        elementUpsert: elementsAdapter.upsertOne,
        elementRemove: elementsAdapter.removeOne
    }
})


export const { elementUpsert, elementRemove } = elementsSlice.actions;

export const {
    selectAll: selectAllElements,
    selectById: selectElementsById,
    selectIds: selectElementsIds,
  } = elementsAdapter.getSelectors<RootState>((state) => state.elements)

export default elementsSlice.reducer;

import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';


export type Link = {
    entityIdA: string,
    entityIdB: string,
    imgLink: string,
    styleTypeA: string,
    styleTypeB: string
}

const linksAdapter = createEntityAdapter<Link>({})

const linksSlice = createSlice({
    name: 'links',
    initialState: linksAdapter.getInitialState(),
    reducers:{
        linkUpsert: linksAdapter.upsertOne,
        linkRemove: linksAdapter.removeOne
    }
})


export const { linkUpsert, linkRemove } = linksSlice.actions;

export const {
    selectAll: selectAllLinks,
    selectById: selectLinksById,
    selectIds: selectLinksIds,
  } = linksAdapter.getSelectors<RootState>((state) => state.links)

export default linksSlice.reducer;

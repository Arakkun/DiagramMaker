import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { DefaultRootState, RootState } from '../../app/store';


export type Link = {
    entityIdA: string,
    entityIdB: string,
    linkId: string,
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

export function useLink(linkId:string){
    return useSelector((state)=>selectLinksById(state as DefaultRootState, linkId)) as Link;
}
export default linksSlice.reducer;

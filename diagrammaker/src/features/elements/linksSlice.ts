import { createAsyncThunk, createEntityAdapter, createSelector, createSlice, Dictionary } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { DefaultRootState, RootState } from '../../app/store';
import Dexie from 'dexie'

// DB initialization

class linksDb extends Dexie {

    links: Dexie.Table<Link, string>

    constructor(){
        super("links");
        // to be used just as a storage! So indexing is not needed if not for linkId
        this.version(1).stores({
            links: "linkId"
        })
        this.links = this.table("links");
    }
}

const db = new linksDb();

// Reducer
export type Link = {
    entityIdA: string,
    entityIdB: string,
    linkId: string,
    styleTypeA: string,
    styleTypeB: string,
    selected: number
}

const linksAdapter = createEntityAdapter<Link>({
    selectId: (link) => link.linkId,
})

export const linkUpsert = createAsyncThunk('links/linkUpsert', async (link: Link, thunkApi) => {
    // upsert into db
    db.links.put(link)
    return link
  })

export const linkRemove = createAsyncThunk('links/linkRemove', async (linkId : string, thunkApi) => {
    // remove from db
    db.links.delete(linkId)
    return linkId
  })

  export const linkFetch = createAsyncThunk('links/linkFetch', async (_,thunkApi) => {
    // fetch all
    var links = await db.links.toArray();
    return links;
  })

const linksSlice = createSlice({
    name: 'links',
    initialState: linksAdapter.getInitialState(),
    reducers:{},
    extraReducers:{
        [linkFetch.fulfilled as any]: linksAdapter.upsertMany,
        [linkUpsert.fulfilled as any]: linksAdapter.upsertOne,
        [linkRemove.fulfilled as any]: linksAdapter.removeOne
    }
})


export const {
    selectAll: selectAllLinks,
    selectById: selectLinksById,
    selectIds: selectLinksIds,
  } = linksAdapter.getSelectors<RootState>((state) => state.links)

export function useSelectedLinks(){
    return useSelector(selectAllLinks).filter((link) => link.selected==1);
}

export function useLink(linkId:string){
    return useSelector((state)=>selectLinksById(state as DefaultRootState, linkId)) as Link;
}
export default linksSlice.reducer;

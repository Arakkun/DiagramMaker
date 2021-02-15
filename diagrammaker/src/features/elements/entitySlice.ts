import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { DefaultRootState, RootState } from '../../app/store';
import Dexie from 'dexie'

// DB initialization

class entitiesDb extends Dexie {

    entities: Dexie.Table<Entity, string>

    constructor(){
        super("entities");
        // to be used just as a storage! So indexing is not needed if not for entityId
        this.version(1).stores({
            entities: "entityId"
        })
        this.entities = this.table("entities");
    }
}

const db = new entitiesDb();

// Reducer

export type Entity = {
    name: string,
    entityId: string,
    imgLink: string,
    styleTypeA: string,
    styleTypeB: string
}

const entitiesAdapter = createEntityAdapter<Entity>({
    selectId: (entity) => entity.entityId,
    sortComparer: (a,b) => a.name.localeCompare(b.name),
})

export const entityUpsert = createAsyncThunk('entities/entityUpsert', async (entity: Entity, thunkApi) => {
    // upsert into db
    db.entities.put(entity)
    return entity
  })

export const entityRemove = createAsyncThunk('entities/entityRemove', async (entityId : string, thunkApi) => {
    // remove from db
    db.entities.delete(entityId)
    return entityId
  })

  export const entityFetch = createAsyncThunk('entities/entityFetch', async (_,thunkApi) => {
    // fetch all
    var entities = await db.entities.toArray();
    return entities;
  })

const entitiesSlice = createSlice({
    name: 'entities',
    initialState: entitiesAdapter.getInitialState(),
    reducers:{},
    extraReducers:{
        [entityFetch.fulfilled as any]: entitiesAdapter.upsertMany,
        [entityUpsert.fulfilled as any]: entitiesAdapter.upsertOne,
        [entityRemove.fulfilled as any]: entitiesAdapter.removeOne
    }
})


export const {
    selectAll: selectAllEntities,
    selectById: selectEntitiesById,
    selectIds: selectEntitiesIds,
    selectEntities: selectEntityDictionary,
  } = entitiesAdapter.getSelectors<RootState>((state) => state.entities)

export function useEntity(entityId:string){
    return useSelector((state)=>selectEntitiesById(state as DefaultRootState, entityId)) as Entity;
}

export function useFilteredEntities(entitySet:Set<string>){
    return useSelector(selectAllEntities).filter((entity) => entitySet.has(entity.entityId))
}

export default entitiesSlice.reducer;

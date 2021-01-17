import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { DefaultRootState, RootState } from '../../app/store';

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

const entitiesSlice = createSlice({
    name: 'entities',
    initialState: entitiesAdapter.getInitialState(),
    reducers:{
        entityUpsert: entitiesAdapter.upsertOne,
        entityRemove: entitiesAdapter.removeOne
    }
})


export const { entityUpsert, entityRemove } = entitiesSlice.actions;

export const {
    selectAll: selectAllEntities,
    selectById: selectEntitiesById,
    selectIds: selectEntitiesIds,
  } = entitiesAdapter.getSelectors<RootState>((state) => state.entities)

export function useEntity(entityId:string){
    return useSelector((state)=>selectEntitiesById(state as DefaultRootState, entityId)) as Entity;
}
export default entitiesSlice.reducer;

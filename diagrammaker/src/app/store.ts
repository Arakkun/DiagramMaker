import { configureStore, ThunkAction, Action, EntityId, EntityState } from '@reduxjs/toolkit';
import entitiesReducer, {Entity} from '../features/elements/entitySlice';
import linksReducer, {Link} from '../features/elements/linksSlice';
import tabReducer, {TabState} from '../features/navigation/tabSlice';

export interface DefaultRootState {
  tab: TabState,
  entities: EntityState<Entity>,
  links: EntityState<Link>
}

export const store = configureStore({
  reducer: {
    tab: tabReducer,
    entities: entitiesReducer,
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

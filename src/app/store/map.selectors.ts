import { createSelector} from '@ngrx/store';
import { MapState } from './map.reducer';
import { AppState } from './app.state';

export const selectMapState = (state: AppState) => state.map;

export const selectMapData = createSelector(
  selectMapState,
  (state: MapState) => state.mapData
);




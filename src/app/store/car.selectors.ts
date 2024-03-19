import { createSelector} from '@ngrx/store';
import { CarState } from './car.reducer';
import { AppState } from './app.state';

export const selectCarState = (state: AppState) => state.car;

export const selectCarData = createSelector(
    selectCarState,
    (state: CarState) => state.vehicleSelected
  );

export const selectWorstCarRange = createSelector(
    selectCarState,
    (state: CarState) => state.vehicleSelected.range.chargetrip_range.worst
  );
import { createAction, props } from '@ngrx/store';
import { Vehicle } from '../types/vehicle.types';

export const updateVehicleImage = createAction('[Map Controller] Update Vehicle Image Data', props<{ vehicleImageUrl: string }>());
export const updateVehicleName = createAction('[Map Controller] Update Vehicle Name', props<{ vehicleName: string }>());
export const updateVehiclesQueried = createAction('[Map Controller] Update Vehicles Queried', props<{ vehiclesQueried: Vehicle[] }>());
export const updateVehicleSelected = createAction('[Map Controller] Update Vehicle Selected', props<{ vehicleSelected: Vehicle }>());
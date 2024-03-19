import { createReducer, on } from '@ngrx/store';
import { updateVehicleImage, updateVehicleName, updateVehiclesQueried, updateVehicleSelected } from './car.actions';

import { Vehicle, MediaItem } from '../types/vehicle.types';

export interface CarState {
  vehicleSelected: Vehicle;
  vehicles: Vehicle[];
}

// Initialize empty values for each type
const emptyVehicle: Vehicle = {
    id: '',
    naming: { make: '', model: '', version: '', edition: '', chargetrip_version: '' },
    drivetrain: { type: '' },
    connectors: [],
    adapters: [],
    battery: { usable_kwh: 0, full_kwh: 0 },
    body: { seats: 0 },
    availability: { status: '' },
    range: { chargetrip_range: { best: 0, worst: 0 } },
    media: { image: emptyMediaItem(), brand: emptyMediaItem(), video: { id: '', url: '' } },
    routing: { fast_charging_support: false },
    connect: { providers: [] }
};

function emptyMediaItem(): MediaItem {
    return {
        id: '',
        type: '',
        url: '',
        height: 0,
        width: 0,
        thumbnail_url: 'data:image/png;base64,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" }',
        thumbnail_height: 0,
        thumbnail_width: 0
    };
}

export const initialState: CarState = {
    vehicleSelected: emptyVehicle,
            vehicles: []
};

export const mapReducer = createReducer(
  initialState,
  on(updateVehicleImage, (state, { vehicleImageUrl }) => ({
    ...state,
    vehicleSelected: {
      ...state.vehicleSelected,
      imageUrl: vehicleImageUrl
    }
  })),
  on(updateVehicleName, (state, { vehicleName }) => ({
    ...state,
    vehicleSelected: {
      ...state.vehicleSelected,
      name: vehicleName
    }
  })),
  on(updateVehiclesQueried, (state, { vehiclesQueried }) => ({
    ...state,
    vehicles: vehiclesQueried
  })),
  on(updateVehicleSelected, (state, { vehicleSelected }) => ({
    ...state,
    vehicleSelected
  }))
);



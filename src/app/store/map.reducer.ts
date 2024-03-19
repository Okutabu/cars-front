import { createReducer, on } from '@ngrx/store';
import { updateMapData, updateStartAddress, updateEndAddress, updateStartLocation, updateEndLocation } from './map.actions';

import { MapData } from '../types/mapdata.model';

export interface MapState {
  mapData: MapData;
}

export const initialState: MapState = {
  mapData: { startAddress: "", endAddress: "", startLocation: null, endLocation: null }
};

export const mapReducer = createReducer(
  initialState,
  on(updateMapData, (state, { mapData }) => ({...state, mapData: { ...mapData },})),
  on(updateStartAddress, (state, { startAddress }) => ({
    ...state,
    mapData: {
      ...state.mapData,
      startAddress: startAddress // Update startAddress property
    }
  })),
  on(updateEndAddress, (state, { endAddress }) => ({
    ...state,
    mapData: {
      ...state.mapData,
      endAddress: endAddress 
    }
  })),
  on(updateStartLocation, (state, { startLocation }) => ({
    ...state,
    mapData: {
      ...state.mapData,
      startLocation: startLocation 
    }
  })),
  on(updateEndLocation, (state, { endLocation }) => ({
    ...state,
    mapData: {
      ...state.mapData,
      endLocation: endLocation 
    }
  }))

);



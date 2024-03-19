import { createAction, props } from '@ngrx/store';
import { MapData, MapDataLatLng } from '../types/mapdata.model';

export const updateMapData = createAction('[Map] Update Map Data', props<{ mapData: MapData }>());
export const updateStartAddress = createAction('[Map] Update Start Address', props<{ startAddress: string }>());
export const updateEndAddress = createAction('[Map] Update End Address', props<{ endAddress: string }>());
export const updateStartLocation = createAction('[Map] Update Start Location', props<{ startLocation: MapDataLatLng }>());
export const updateEndLocation = createAction('[Map] Update End Location', props<{ endLocation: MapDataLatLng }>());
import { MapState } from "./map.reducer";
import { CarState } from "./car.reducer";

export interface AppState {
    map: MapState;
    car: CarState;
}
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { MapData } from '../types/mapdata.model';
import * as mapActions from '../store/map.actions';
import { AppState } from '../store/app.state';

@Injectable({
    providedIn: 'root'
})
export class MapStateService {
    constructor(private store: Store<AppState>) {}

    updateMapData(mapData: MapData): void {
        this.store.dispatch(mapActions.updateMapData({ mapData }));
        console.log('Map data updated in service');
    }

    saySomething(): void {
        console.log('Hello from MapStateService');
    }
}

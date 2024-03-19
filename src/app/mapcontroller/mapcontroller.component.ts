// controller.component.ts
import {Component, OnInit, ViewChild , ElementRef} from '@angular/core';
import { MapApiService } from '../services/map.service';
import { MapStateService } from '../services/map-state.service';
import { MapDataLatLng, MapData } from '../types/mapdata.model';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { VehicleService } from '../services/vehicle.service';
import { Vehicle } from '../types/vehicle.types';

import { GoogleMap } from '@angular/google-maps';

import { Store } from '@ngrx/store';
import * as MapActions from '../store/map.actions';
import { MapState } from '../store/map.reducer';
import { AppState } from '../store/app.state';
import { AsyncPipe } from '@angular/common';
import { selectCarData } from '../store/car.selectors';
import { Observable } from 'rxjs';

// for vehicle selector
import { VehicleSelectorComponent } from '../vehicle-selector/vehicle-selector.component';


@Component({
  selector: 'app-controller',
  templateUrl: `./mapcontroller.component.html`, 
  styleUrls: [`./mapcontroller.component.scss`],
  imports: [FormsModule, AsyncPipe, ReactiveFormsModule, VehicleSelectorComponent], 
  standalone: true,
  providers: [MapApiService, MapStateService, VehicleService]
})

export class ControllerComponent implements OnInit{

  GoogleKEY = 'AIzaSyBGZ7UNo2i2zMEa50saItywobPR0mky9uk';
  // auto complete
  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  @ViewChild('autocompleteInput', { static: false }) autocompleteInput!: ElementRef;

  autocompleteOptions: google.maps.places.AutocompleteOptions = {
    types: ['geocode']
  };
  autocomplete: google.maps.places.Autocomplete | undefined;

  // fields for query management 
  vehicleCtrl = new FormControl();
  selectedVehicle?: Vehicle
  mapdata!: MapData;
  vehicles: Vehicle[] = []; // Store the fetched vehicles
  filteredVehicles$?: Observable<Vehicle[]>; // dynamic list of vehicles from fetch

  constructor(private mapApiService: MapApiService, private mapStateService: MapStateService, private vehicleService: VehicleService, private mapStore: Store<MapState>, private store: Store<AppState>) {
    
  }

  filterVehicles(name: string) {
    return this.vehicles.filter(vehicle =>
      vehicle.naming.model.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  ngOnInit() {
    this.initMapData();
    this.initSelectedVehicle();
    this.initAutocomplete('startInput');
    this.initAutocomplete('arrivalInput');
  }

  initSelectedVehicle(){
    this.store.select(selectCarData).subscribe(vehicle => {
      this.selectedVehicle = vehicle;
    });
  }

  initAutocomplete(inputId: string) {
    const inputElement = document.getElementById(inputId) as HTMLInputElement;
    const autocomplete = new google.maps.places.Autocomplete(
      inputElement,
      this.autocompleteOptions
    );
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        console.log('Place details not found for input:', place.name);
        return;
      }
      console.log('Selected place:', place);
      if (inputId === 'startInput') {
        this.updateStartAddressFromString(place.formatted_address);
        if (place.geometry.location) {
          var startLocation: MapDataLatLng = { latitude: place.geometry.location.lat(), longitude: place.geometry.location.lng() };
          this.updateStartLocation(startLocation);
        } else {
          console.error('Start location is not valid');
        }
      } else if (inputId === 'arrivalInput') {
        this.updateEndAddressFromString(place.formatted_address);
        if (place.geometry.location) {
          var endLocation: MapDataLatLng = { latitude: place.geometry.location.lat(), longitude: place.geometry.location.lng() };
          this.updateEndLocation(endLocation);
        } else {
          console.error('End location is not valid');
        }
      }
    });
  }

  initMapData(){
    this.mapdata = {
      startAddress: "",
      endAddress: "",
      startLocation: null,
      endLocation: null
    };
  }

  updateStartAddress(event: Event): void {
    const startAddress = (event.target as HTMLInputElement).value;
    this.mapStore.dispatch(MapActions.updateStartAddress({ startAddress }));
  }
  
  private updateStartAddressFromString(startAddress: string | undefined): void {
    if (startAddress) {
      this.mapStore.dispatch(MapActions.updateStartAddress({ startAddress }));
    } else {
      console.error('Start address is not valid');
    }
  }

  private updateStartLocation(startLocation: MapDataLatLng): void {
    this.mapStore.dispatch(MapActions.updateStartLocation({ startLocation }));
  }

  updateEndAddress(endAddress: string): void {
    this.mapStore.dispatch(MapActions.updateEndAddress({ endAddress }));
  }

  private updateEndAddressFromString(endAddress: string | undefined): void {
    if (endAddress) {
      this.mapStore.dispatch(MapActions.updateEndAddress({ endAddress }));
    } else {
      console.error('End address is not valid');
    }
  }

  private updateEndLocation(endLocation: MapDataLatLng): void {
    this.mapStore.dispatch(MapActions.updateEndLocation({ endLocation }));
  }
  
   

}

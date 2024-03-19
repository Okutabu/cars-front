import { Component } from '@angular/core';
import { VehicleService } from '../services/vehicle.service';
import { Vehicle } from '../types/vehicle.types';
import { Observable } from 'rxjs';
import { OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';

@Component({
  selector: 'app-vehicle-selector',
  standalone: true,
  imports: [],
  templateUrl: './vehicle-selector.component.html',
  styleUrl: './vehicle-selector.component.scss'
})
export class VehicleSelectorComponent implements OnInit{
  selectedVehicle!: Vehicle;
  position = 0;
  vehicles: Vehicle[] = []; // Store the fetched vehicles
  filteredVehicles$?: Observable<Vehicle[]>; // dynamic list of vehicles from fetch

  constructor(private vehicleService: VehicleService, private Store: Store<AppState>) {
    
   }

  ngOnInit(): void {
    this.vehicleService.getVehicleList().subscribe({
      next: (response) => {
        this.filteredVehicles$ = response.data.vehicleList;
        this.vehicles = [...response.data.vehicleList];
        this.selectedVehicle = this.vehicles[this.position];
      },
      error: (error) => console.error('There was an error sending the query', error),
    });

  }

  nextVehicle(): void {
    this.position = (this.position + 1) % this.vehicles.length;
    this.selectedVehicle = this.vehicles[this.position];
  }

  previousVehicle(): void {
    this.position = (this.position - 1 + this.vehicles.length) % this.vehicles.length;
    this.selectedVehicle = this.vehicles[this.position];
  }

  updateSearch(event: Event): void {
    const name = (event.target as HTMLInputElement).value;
    this.position = 0;
    this.vehicleService.getVehicleList({search: name}).subscribe({
      next: (response) => {
        console.log('response data:', response.data.vehicleList);
        this.filteredVehicles$ = response.data.vehicleList;
        this.vehicles = [...response.data.vehicleList];
        this.selectedVehicle = this.vehicles[this.position];

      },
      error: (error) => console.error('There was an error sending the query', error),
    });
  }
}

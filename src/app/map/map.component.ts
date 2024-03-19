
import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as L from 'leaflet';
import "leaflet/dist/leaflet.css";
import { MapData } from '../types/mapdata.model';
//store
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../store/app.state';
import { selectMapData } from '../store/map.selectors';
import { AsyncPipe } from '@angular/common';
import { selectWorstCarRange } from '../store/car.selectors';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  imports: [AsyncPipe],
  standalone: true,
})

export class MapComponent implements AfterViewInit{
  private map!: google.maps.Map | null;
  @ViewChild('mapWrapper', {static: false}) mapElement!: ElementRef;
  private initialized = false;
  mapData$?: Observable<MapData>;
  DISTANCEAPIKEY = '5m2E09PhCnZ61yHQgXF43gglJZewGQgje0RFgDL3OzpQiuOtzCPc0Tg03yl90a8R';

  constructor(private store: Store<AppState>) {
    this.mapData$ = this.store.select(selectMapData);
    this.mapData$?.subscribe((data) => {
      if (data) {
        this.updateMap(data);
      }
    });
  }

  ngAfterViewInit(): void {
    
    if (!this.initialized) {
      this.initMap();
    }
  
  }

  private initMap(): void {
    const chambery = { lat: 45.564601, lng: 5.917781 };

    const mapOptions = {
      center: chambery,
      zoom: 13,
      mapId: "DEMO_MAP_ID",
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.initialized = true;
    
  }

  // Method to update map dynamically
  public updateMap(data: MapData): void {

    if (data.startLocation && data.endLocation) {
      const startLatLng = new google.maps.LatLng(data.startLocation.latitude, data.startLocation.longitude);
      const endLatLng = new google.maps.LatLng(data.endLocation.latitude, data.endLocation.longitude);

      const directionsService = new google.maps.DirectionsService();

      const routingRequest = {
        origin: startLatLng,
        destination: endLatLng,
        travelMode: google.maps.TravelMode.DRIVING,
      };

      var distanceRequest = `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${startLatLng.lat},${startLatLng.lng}&destinations=${endLatLng.lat},${endLatLng.lng}&key=5m2E09PhCnZ61yHQgXF43gglJZewGQgje0RFgDL3OzpQiuOtzCPc0Tg03yl90a8R`
      console.log('Distance Request:', distanceRequest);

      const bounds = new google.maps.LatLngBounds();
      bounds.extend(startLatLng);
      bounds.extend(endLatLng);

      var distance = 0; var duration;
      // Fit the map to the bounds
      this.map?.fitBounds(bounds);
      // get distance matrix response
      fetch(distanceRequest)
        .then(response => response.json())
        .then(data => {
          console.log('Distance Matrix Response:', data);
          distance = data.rows[0].elements[0].distance.text;
          duration = data.rows[0].elements[0].duration.text;
          console.log('Distance:', distance);
          console.log('Duration:', duration);
        })
        .catch(error => console.error('Error:', error));
        
        //check if the car can make the trip



      directionsService.route(routingRequest, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          const route = result?.routes[0].legs[0];
          const polyline = new google.maps.Polyline({
            path: route?.steps.map(step => ({ lat: step.start_location.lat(), lng: step.start_location.lng() })),
            strokeColor: '#0000FF',
            strokeOpacity: 1.0,
            strokeWeight: 2,
          });
          polyline.setMap(this.map);
        } else {
          console.warn('Error:', status);
        }
      });
      console.log('Directions Requested');
    } else {
      console.warn('Both startLocation and endLocation must be defined to trace directions.');
    }
  }
}

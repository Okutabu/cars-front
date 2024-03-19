import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MapData } from '../types/mapdata.model';


@Injectable({
  providedIn: 'root'
})
export class MapApiService {

  private apiUrl = 'http:localhost:3000'; // URL to web API

  constructor(private http: HttpClient) {}

  getMapData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/map-data`);
  }

  updateMapData(mapdata: MapData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/update-map`, mapdata);
  }

  // More methods as per your API's capabilities
}

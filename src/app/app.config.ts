import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from "@angular/common/http";


import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { mapReducer } from './store/map.reducer';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(), Apollo, HttpLink, provideStore(), provideState({name: 'map', reducer: mapReducer})],
};

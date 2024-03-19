import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { setContext } from '@apollo/client/link/context';
import { vehicleListQuery } from '../graphql-queries';

// project id: 65cdcaa48b60696fc038f213
// app id: 65cdcaa48b60696fc038f215

@Injectable({
  providedIn: 'root',
})

export class VehicleService {
  constructor(private apollo: Apollo, private httpLink: HttpLink) {
    const uri = 'https://api.chargetrip.io/graphql'; // GraphQL server URL
    const http = httpLink.create({ uri });

    // Middleware for setting the HTTP headers
    const authLink = setContext((operation, context) => ({
      headers: {
        'x-client-id': '65cdcaa48b60696fc038f213',
        'x-app-id': '65cdcaa48b60696fc038f215',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }));

    // Create Apollo client instance
    this.apollo.create({
      link: authLink.concat(http),
      cache: new InMemoryCache(),
    });
  }

  // Method to execute a GraphQL query
  getVehicleList({ page = 1, size = 10, search = '' } = {}) {
    return this.apollo.watchQuery<any>({
      query: vehicleListQuery,
      variables: { page, size, search },
    }).valueChanges;
  }
}

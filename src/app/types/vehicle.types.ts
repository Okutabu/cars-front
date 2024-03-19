export interface Vehicle {
    id: string;
    naming: Naming;
    drivetrain: Drivetrain;
    connectors: Connector[];
    adapters: Adapter[];
    battery: Battery;
    body: Body;
    availability: Availability;
    range: VehicleRange;
    media: Media;
    routing: Routing;
    connect: Connect;
  }
  
  export interface Naming {
    make: string;
    model: string;
    version: string;
    edition: string;
    chargetrip_version: string;
  }
  
  export interface Drivetrain {
    type: string;
  }
  
  export interface Connector {
    standard: string;
    power: number;
    max_electric_power: number;
    time: number;
    speed: number;
  }
  
  // Assuming Adapter has the same structure as Connector
  export type Adapter = Connector;
  
  export interface Battery {
    usable_kwh: number;
    full_kwh: number;
  }
  
  export interface Body {
    seats: number;
  }
  
  export interface Availability {
    status: string;
  }
  
  export interface VehicleRange {
    chargetrip_range: {
      best: number;
      worst: number;
    };
  }
  
  export interface Media {
    image: MediaItem;
    brand: MediaItem;
    video: Video;
  }
  
  export interface MediaItem {
    id: string;
    type: string;
    url: string;
    height: number;
    width: number;
    thumbnail_url: string;
    thumbnail_height: number;
    thumbnail_width: number;
  }
  
  export interface Video {
    id: string;
    url: string;
  }
  
  export interface Routing {
    fast_charging_support: boolean;
  }
  
  export interface Connect {
    providers: string[];
  }
  
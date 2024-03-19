export type MapDataLatLng = {
    latitude: number,
    longitude: number
  };

export type MapData = {
    startAddress: string | undefined,
    endAddress: string | undefined,
    startLocation: MapDataLatLng | null,
    endLocation: MapDataLatLng | null
  };
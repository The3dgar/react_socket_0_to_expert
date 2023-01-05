import { useCallback, useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import mapboxgl, { Marker } from 'mapbox-gl';
import { Subject } from 'rxjs';

const { VITE_MAP_API_KEY } = import.meta.env;
mapboxgl.accessToken = VITE_MAP_API_KEY;

interface InitialPoint {
  lng: number;
  lat: number;
  zoom: number;
}

interface Props {
  initialPoint: InitialPoint;
}

interface CustomMarkers extends Marker {
  id?: string;
}

interface CustomDragEvent {
  target: {
    getLngLat: () => {
      lng: number;
      lat: number;
    };
    id: string;
  };
}

export interface MarkerObserver {
  id?: string;
  lng: string | number;
  lat: string | number;
}

const parseCoords = (val: number | string): number => {
  return typeof val === 'number'
    ? parseFloat(val.toFixed(4))
    : parseCoords(Number(val));
};

export const useMapbox = ({ initialPoint }: Props) => {
  const mapRef = useRef<any>();
  const setRef = useCallback((node: any) => {
    mapRef.current = node;
  }, []);

  const map = useRef<mapboxgl.Map>();
  const [coords, setCoords] = useState(initialPoint);

  const markers = useRef<{ [x: string]: Marker }>({});

  // observables : objecto que emite valores cuando algo ocurre
  const movementsMarker = useRef(new Subject());
  const newMarker = useRef(new Subject());

  // function to add markers
  const addMarker = useCallback(
    (
      e: (mapboxgl.MapMouseEvent & mapboxgl.EventData) | MarkerObserver,
      markerId = ''
    ) => {
      if (!map.current) return;
      let { lng, lat } = 'lngLat' in e ? e.lngLat : e;
      lng = parseCoords(lng);
      lat = parseCoords(lat);

      const id = uuid();

      const marker = new mapboxgl.Marker() as CustomMarkers;
      marker.id = markerId ? `${markerId}` : id;
      marker.setLngLat([lng, lat]).addTo(map.current).setDraggable(true);
      markers.current[marker.id] = marker;

      // TODO: si el marker tiene id no emitir
      if (!markerId) {
        newMarker.current.next({
          id,
          lng,
          lat,
        });
      }

      // events
      marker.on('drag', (evDrag) => {
        const { target } = evDrag as CustomDragEvent;
        const { lat, lng } = target.getLngLat();
        //todo: emit marker change
        movementsMarker.current.next({
          id: marker.id,
          lng,
          lat,
        });
      });
    },
    []
  );

  //update marker location
  const updateMarker = useCallback(({ id, lat, lng }: MarkerObserver) => {
    if (!id) return;
    markers.current[id].setLngLat([parseCoords(lng), parseCoords(lat)]);
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    const mapConfig = new mapboxgl.Map({
      container: mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [coords.lng, coords.lat],
      zoom: coords.zoom,
    });

    map.current = mapConfig;
  }, [initialPoint]);

  useEffect(() => {
    map.current?.on('move', () => {
      if (!map.current) return;
      const { lat, lng } = map.current.getCenter();

      setCoords({
        lat: parseCoords(lat),
        lng: parseCoords(lng),
        zoom: parseCoords(map.current?.getZoom()),
      });
    });
  }, []);

  useEffect(() => {
    map.current?.on('click', addMarker);
  }, [addMarker]);

  return {
    addMarker,
    coords,
    markers,
    movementsMarker$: movementsMarker.current,
    newMarker$: newMarker.current,
    setRef,
    updateMarker,
  };
};

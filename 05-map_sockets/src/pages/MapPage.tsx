import { useContext, useEffect } from 'react';
import { MarkerObserver, useMapbox } from '../hooks/useMapbox';
import { SocketContext } from '../context/SocketContext';

const initialPoint = {
  lng: 5,
  lat: 34,
  zoom: 5,
};

export const MapPage = () => {
  const {
    newMarker$,
    coords,
    setRef,
    movementsMarker$,
    addMarker,
    updateMarker,
  } = useMapbox({
    initialPoint,
  });

  const { socket } = useContext(SocketContext);

  useEffect(() => {
    newMarker$.subscribe((marker) => {
      const data = marker as MarkerObserver;
      socket.emit('new-marker', data);
    });
  }, [newMarker$, socket]);

  useEffect(() => {
    movementsMarker$.subscribe((marker) => {
      const data = marker as MarkerObserver;
      socket.emit('update-marker', data);
    });
  }, [movementsMarker$, socket]);

  //listen to movements marker
  useEffect(() => {
    socket.on('update-marker', (marker: MarkerObserver) => {
      updateMarker(marker);
    });
  }, [socket]);

  // listen to active markers
  useEffect(() => {
    socket.on('active-markers', (markers: MarkerObserver[]) => {
      console.log('active_markers:', markers);
      for (const key in markers) {
        if (Object.prototype.hasOwnProperty.call(markers, key)) {
          const element = markers[key];
          addMarker(element, key);
        }
      }
    });
    return () => {};
  }, [socket, addMarker]);

  // listen to new marker event
  useEffect(() => {
    socket.on('new-marker', (marker: MarkerObserver) => {
      addMarker(marker, marker.id);
    });
  }, [socket, addMarker]);

  return (
    <>
      <div className='info'>
        <span>
          Lng: {coords.lng} | Lat : {coords.lat} | zoom: {coords.zoom}
        </span>
      </div>
      <div className='map-container' ref={setRef}></div>
    </>
  );
};

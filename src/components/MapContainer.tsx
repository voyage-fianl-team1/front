import React, { useRef, useState } from 'react';
import { Map, ZoomControl, MapMarker } from 'react-kakao-maps-sdk';

const MapContainer = () => {
  const mapRef = useRef(null);
  const [position, setPosition] = useState({ lat: 0, lng: 0 });
  console.log(position.lat, position.lng);
  return (
    <Map
      center={{
        lat: 37.6378799247,
        lng: 127.020584374,
      }}
      className='w-screen h-screen'
      level={3}
      ref={mapRef}
      onClick={(_t, mouseEvent) =>
        setPosition({
          lat: mouseEvent.latLng.getLat(),
          lng: mouseEvent.latLng.getLng(),
        })
      }
    >
      {position && <MapMarker position={position} />}
      <ZoomControl position={window.kakao.maps.ControlPosition.TOPRRIGHT} />
    </Map>
  );
};

export default MapContainer;

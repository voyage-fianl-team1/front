import React, { useRef, useState, useEffect } from 'react';
import { Map, ZoomControl, MapMarker, MapInfoWindow } from 'react-kakao-maps-sdk';

const MapContainer = () => {
  const mapRef = useRef(null);
  const [position, setPosition] = useState({ lat: 0, lng: 0 });
  const [state, setState] = useState({
    center: {
      lat: 37.6378799247,
      lng: 127.020584374,
    },
    errMsg: 'test',
    isLoading: true,
  });
  // const [address, setAddress] = useState<string>();
  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (positions) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: positions.coords.latitude, // 위도
              lng: positions.coords.longitude, // 경도
            },
            isLoading: false,
          }));
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      setState((prev) => ({
        ...prev,
        errMsg: 'geolocation을 사용할수 없어요..',
        isLoading: false,
      }));
    }
  }, []);
  return (
    <Map
      center={{ lat: state.center.lat, lng: state.center.lng }}
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
      <MapInfoWindow position={{ lat: position.lat, lng: position.lng }} removable>
        <div>Hello World</div>
      </MapInfoWindow>
      {position && <MapMarker position={position} draggable />}
      <ZoomControl position={window.kakao.maps.ControlPosition.TOPRRIGHT} />
    </Map>
  );
};

export default MapContainer;

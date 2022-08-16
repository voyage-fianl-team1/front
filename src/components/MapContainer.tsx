import React, { useRef, useState, useEffect } from 'react';
import { Map, ZoomControl, MapMarker, MapInfoWindow } from 'react-kakao-maps-sdk';

const MapContainer = () => {
  const mapRef = useRef(null);
  const [position, setPosition] = useState({ lat: 0, lng: 0 });
  const [address, setAddress] = useState<string>();
  const [state, setState] = useState({
    center: {
      lat: 37.6378799247,
      lng: 127.020584374,
    },
    errMsg: '',
    isLoading: true,
  });
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (positions) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: positions.coords.latitude,
              lng: positions.coords.longitude,
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
        errMsg: '위치 정보를 받아 올 수 없습니다. 설정을 확인해 주세요.',
        isLoading: false,
      }));
    }
  }, []);
  const getAddress = (lat: number, lng: number) => {
    // 주소-좌표 변환 객체를 생성합니다
    const geocoder = new window.kakao.maps.services.Geocoder();

    const coord = new window.kakao.maps.LatLng(lat, lng);
    const callback = function (result: any, status: string) {
      if (status === window.kakao.maps.services.Status.OK) {
        const arr = { ...result };
        const arr1 = arr[0].address.address_name;
        setAddress(arr1);
      }
    };
    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  };

  useEffect(() => {
    getAddress(position.lat, position.lng);
  });
  return (
    <Map
      center={{ lat: state.center.lat, lng: state.center.lng }}
      className='w-screen h-screen'
      level={4}
      ref={mapRef}
      onClick={(_t, mouseEvent) =>
        setPosition({
          lat: mouseEvent.latLng.getLat(),
          lng: mouseEvent.latLng.getLng(),
        })
      }
    >
      {/* {!state.isLoading && <MapMarker position={state.center} />} */}
      <MapInfoWindow position={{ lat: position.lat, lng: position.lng }}>
        <div className='flex justify-center text-center w-full text-sm'>{address}</div>
      </MapInfoWindow>
      {position && <MapMarker position={position} draggable />}
      <ZoomControl position={window.kakao.maps.ControlPosition.TOPRRIGHT} />
    </Map>
  );
};

export default MapContainer;

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Map, ZoomControl, MapMarker, MapInfoWindow } from 'react-kakao-maps-sdk';
import addressAction from '../redux/features/addressSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';

const MapContainer = () => {
  const mapRef = useRef(null);
  const dispatch = useDispatch<AppDispatch>();
  const [position, setPosition] = useState({ lat: 0, lng: 0 });
  const [address, setAddress] = useState<string>();
  const [state, setState] = useState({
    center: {
      lat: position.lat,
      lng: position.lng,
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

  const handleSendAddress = () => {
    dispatch(addressAction.actions.addressAction({ address: address, lat: position.lat, lng: position.lng }));
  };

  const getAddress = (lat: number, lng: number) => {
    // 주소-좌표 변환 객체를 생성
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
      style={{
        position: 'relative',
        width: '100%',
        height: '80rem',
      }}
      level={4}
      ref={mapRef}
      onClick={(_t, mouseEvent) =>
        setPosition({
          lat: mouseEvent.latLng.getLat(),
          lng: mouseEvent.latLng.getLng(),
        })
      }
    >
      {/* 현위치 마커찍기
      {!state.isLoading && <MapMarker position={state.center} />} */}
      {position && <MapMarker position={position} draggable />}
      <ZoomControl position={window.kakao.maps.ControlPosition.TOPRRIGHT} />
      <span className='flex flex-row items-center gap-5 mt-3'>
        <div>{address}</div>
        <button type='button' onClick={handleSendAddress}>
          선택
        </button>
      </span>
    </Map>
  );
};

export default MapContainer;

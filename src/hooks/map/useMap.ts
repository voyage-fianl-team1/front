import React, { useRef, useState, useEffect } from 'react';
import { addressAction } from '../../redux/features/addressSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { toggleModalShow } from '../../redux/features/toggleSlice';

export function useMap<T>(defaultValue: T) {
  const mapRef = useRef(null);
  const dispatch = useDispatch();
  const nowPosition = useSelector((state: RootState) => state.persistReducered.position);
  const [position, setPosition] = useState({ lat: 0, lng: 0 });
  const [address, setAddress] = useState<string>();

  const loadAddress = () => {
    useEffect(() => {
      getAddress(position.lat, position.lng);
    }, [position]);
  };

  const getAddress = (lat: number, lng: number) => {
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

  const handleSendAddress = () => {
    dispatch(addressAction({ address: address, lat: position.lat, lng: position.lng }));
    dispatch(toggleModalShow());
  };
  return {
    handleSendAddress,
    loadAddress,
    mapRef,
    nowPosition,
    position,
    setPosition,
    address,
    setAddress,
  };
}

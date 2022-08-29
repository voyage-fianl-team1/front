import React, { useRef, useState, useEffect } from 'react';
import { Map, ZoomControl, MapMarker } from 'react-kakao-maps-sdk';
import { addressAction } from '../redux/features/addressSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { toggleModalShow } from '../redux/features/toggleSlice';

const MapContainer = () => {
  const mapRef = useRef(null);
  const dispatch = useDispatch();
  const nowPosition = useSelector((state: RootState) => state.persistReducered.position);
  const [position, setPosition] = useState({ lat: 0, lng: 0 });
  const [address, setAddress] = useState<string>();

  useEffect(() => {
    getAddress(position.lat, position.lng);
  }, [position]);

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

  return (
    <Map
      center={{ lat: nowPosition.lat, lng: nowPosition.lng }}
      className='relative w-[100%] h-[100%]'
      level={3}
      //level 14까지
      ref={mapRef}
      onClick={(_t, mouseEvent) =>
        setPosition({
          lat: mouseEvent.latLng.getLat(),
          lng: mouseEvent.latLng.getLng(),
        })
      }
    >
      <ZoomControl position={window.kakao.maps.ControlPosition.TOPRRIGHT} />

      <>
        <MapMarker position={{ lat: position.lat, lng: position.lng }} />
        <div className='w-full h-[50px] flex justify-center items-center bg-[#FCFCFC] mt-3'>{address}</div>
        <span className='flex flex-row items-center gap-5 mt-3'>
          <button
            type='button'
            className='w-[82px] h-[45px] bg-[#FFF] text-[16px] text-[#38393C] leading-[19px] border border-[#9A9B9F]
            font-medium text-center rounded-[8px]'
            onClick={() => dispatch(toggleModalShow())}
          >
            닫기
          </button>
          <button
            type='button'
            className='w-[181px] h-[45px] bg-matchgi-btnblue text-[16px] text-[#FFF] leading-[19px]
            font-medium text-center rounded-[8px]'
            onClick={handleSendAddress}
          >
            선택
          </button>
        </span>
      </>
    </Map>
  );
};

export default MapContainer;

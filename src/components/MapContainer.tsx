import React, { useRef, useState, useEffect } from 'react';
import { Map, ZoomControl, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import addressAction from '../redux/features/addressSlice';
import { MatchData, MatchDataProps } from '../typings';
import { useQuery } from '@tanstack/react-query';
import { instance } from '../apis';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';

const MapContainer = () => {
  const mapRef = useRef(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const res = useQuery(['matchList'], async () => await instance.get(`/api/posts/gps`));
  const [position, setPosition] = useState({ lat: 0, lng: 0 });
  const [address, setAddress] = useState<string>();
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState({
    center: {
      lat: position.lat,
      lng: position.lng,
    },
    errMsg: '',
    isLoading: true,
  });
  useEffect(() => {
    getAddress(position.lat, position.lng);
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
  const MatchMarker = () => {
    if (res.data) {
      const matchData: MatchData = res.data.data;
      return (
        <>
          {matchData.postList.map((v: MatchDataProps, i) => {
            <MapMarker
              key={i}
              // key={`${vtitle}-${position.latlng}`}
              position={{ lat: v.lat, lng: v.lng }}
              clickable
              onClick={() => setIsOpen(true)}
            />;
          })}
          ;
          {isOpen &&
            matchData.postList.map((v: MatchDataProps, i) => {
              <section className='w-48 h-48 bg-white' key={i}>
                <button onClick={() => setIsOpen(false)}>닫기</button>
                <img src={v.imgurls} alt='' className='w-full h-2/3 bg-slate-400'></img>
                <span className='flex flex-col p-0.5'>
                  <div className='text-sm'>{v.title}</div>
                  <div className='text-sm'>{v.subject}</div>
                  <div className='text-sm'>{v.address}</div>
                  <button onClick={() => navigate(`/match/${v.postId}`)}></button>
                </span>
              </section>;
            })}
        </>
      );
    }
  };

  return (
    <Map
      center={{ lat: state.center.lat, lng: state.center.lng }}
      className='relative w-full h-screen'
      level={4}
      ref={mapRef}
      onClick={(_t, mouseEvent) =>
        setPosition({
          lat: mouseEvent.latLng.getLat(),
          lng: mouseEvent.latLng.getLng(),
        })
      }
    >
      <ZoomControl position={window.kakao.maps.ControlPosition.TOPRRIGHT} />
      {window.location.pathname === '/map' ? (
        <CustomOverlayMap position={{ lat: position.lat, lng: position.lng }} xAnchor={0.5} yAnchor={1}>
          {MatchMarker()}
        </CustomOverlayMap>
      ) : (
        <span className='flex flex-row items-center gap-5 mt-3'>
          <div>{address}</div>
          <button type='button' onClick={handleSendAddress}>
            선택
          </button>
        </span>
      )}
    </Map>
  );
};

export default MapContainer;

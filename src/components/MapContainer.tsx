import React, { useRef, useState, useEffect } from 'react';
import { Map, ZoomControl, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { addressAction } from '../redux/features/addressSlice';
import { useQuery } from '@tanstack/react-query';
import { instance } from '../apis';
import { useNavigate } from 'react-router-dom';
import { overlayAction, OverlayState } from '../redux/features/overlaySlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { toggleModalShow } from '../redux/features/sortSlice';

const MapContainer = () => {
  const mapRef = useRef(null);
  const dispatch = useDispatch();
  const overlay = useSelector((state: RootState) => state.overlay);
  const nowPosition = useSelector((state: RootState) => state.position);
  const navigate = useNavigate();
  const res = useQuery(
    ['matchList'],
    async () => await instance.get(`/api/posts/gps?lat=${nowPosition.lat}&lng=${nowPosition.lng}`)
  );
  const [position, setPosition] = useState({ lat: 0, lng: 0 });
  const [address, setAddress] = useState<string>();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getAddress(position.lat, position.lng);
  });

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

  const MatchMarker = () => {
    if (res.data) {
      const matchData = res.data.data;
      return (
        <div>
          {matchData &&
            matchData.map((v: OverlayState, i: number) => (
              <div key={i}>
                <MapMarker
                  position={{ lat: v.lat, lng: v.lng }}
                  clickable
                  onClick={() => {
                    setIsOpen(true);
                    dispatch(
                      overlayAction({
                        postId: v.postId,
                        address: v.address,
                        title: v.title,
                        subject: v.subject,
                        lat: v.lat,
                        lng: v.lng,
                        imgUrl: v.imgUrl,
                      })
                    );
                  }}
                />
              </div>
            ))}
        </div>
      );
    }
  };

  const CustomOverlay = () => {
    if (isOpen) {
      return (
        <section className='w-56 h-56 bg-white'>
          <button className='text-sm' onClick={() => setIsOpen(false)}>
            닫기
          </button>
          <img src={overlay.imgUrl} alt='' className='w-full h-3/5 bg-slate-400'></img>
          <span className='flex flex-col'>
            <div className='text-sm'>{overlay.title}</div>
            <div className='text-sm'>{overlay.subject}</div>
            <div className='text-sm'>{overlay.address}</div>
            <button onClick={() => navigate(`/match/${overlay.postId}`)}>go</button>
          </span>
        </section>
      );
    }
  };

  return (
    <Map
      center={{ lat: nowPosition.lat, lng: nowPosition.lng }}
      className='relative w-full h-screen'
      level={4}
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
      {window.location.pathname === '/map' ? (
        <CustomOverlayMap position={{ lat: overlay.lat, lng: overlay.lng }} xAnchor={0.5} yAnchor={1.1}>
          {MatchMarker()}
          {CustomOverlay()}
        </CustomOverlayMap>
      ) : (
        <>
          <MapMarker position={{ lat: position.lat, lng: position.lng }} />
          <span className='flex flex-row items-center gap-5 mt-3'>
            <div>{address}</div>
            <button type='button' onClick={handleSendAddress}>
              선택
            </button>
          </span>
        </>
      )}
    </Map>
  );
};

export default MapContainer;

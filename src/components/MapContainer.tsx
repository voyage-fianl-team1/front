import React, { useRef, useState, useEffect } from 'react';
import { Map, ZoomControl, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { addressAction } from '../redux/features/addressSlice';
import { useQuery } from '@tanstack/react-query';
import { apis } from '../apis';
import { useNavigate } from 'react-router-dom';
import { overlayAction, overlayClear, OverlayState } from '../redux/features/overlaySlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { toggleModalShow } from '../redux/features/sortSlice';
import { ImageType } from '../typings';

const MapContainer = () => {
  const mapRef = useRef(null);
  const dispatch = useDispatch();
  const overlay = useSelector((state: RootState) => state.overlay);
  const nowPosition = useSelector((state: RootState) => state.persistReducered.position);
  const navigate = useNavigate();
  const res = useQuery(['matchList'], async () => await apis.getAroundGame(nowPosition.lat, nowPosition.lng));
  const [position, setPosition] = useState({ lat: 0, lng: 0 });
  const [address, setAddress] = useState<string>();
  const [isOpen, setIsOpen] = useState(false);
  //useMutation
  useEffect(() => {
    if (window.location.pathname !== '/map') {
      getAddress(position.lat, position.lng);
    }
    return () => {
      dispatch(overlayClear());
    };
  }, []);

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
  //맵을 마운트대 리덕스가 초기값면 다시 지오로케이션으로 가져오고 그 아니면 그냥 하기
  const handleSendAddress = () => {
    dispatch(addressAction({ address: address, lat: position.lat, lng: position.lng }));
    dispatch(toggleModalShow());
  };

  const MarkerObj: ImageType = {
    축구: 'https://velog.velcdn.com/images/blaze096/post/99618854-f41c-4cbb-a0db-7b34f2274ba5/image.png',
    농구: 'https://velog.velcdn.com/images/blaze096/post/bed3418b-105e-4f46-bc54-9853d78cb7a5/image.png',
    기타: 'https://velog.velcdn.com/images/blaze096/post/9131946c-ad2b-461b-998d-6fe9297ff92e/image.png',
    볼링: 'https://velog.velcdn.com/images/blaze096/post/cf185322-33f1-42db-8afc-30e326e0a976/image.png',
    배드민턴: 'https://velog.velcdn.com/images/blaze096/post/12945be3-2e89-472d-8970-935d3e4f8877/image.png',
    테니스: 'https://velog.velcdn.com/images/blaze096/post/f28b1561-f059-4fe9-b7f7-2696aa0c4f86/image.png',
    당구: 'https://velog.velcdn.com/images/blaze096/post/511632d1-23d4-4194-8b75-256fdf33f7c0/image.png',
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
                  image={{
                    src: MarkerObj[v.subject],
                    size: {
                      width: 38,
                      height: 44,
                    },
                  }}
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

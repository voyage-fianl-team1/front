import React, { useRef, useState, useEffect } from 'react';
import { Map, ZoomControl, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { useQuery } from '@tanstack/react-query';
import { apis } from '../apis';
import { useNavigate } from 'react-router-dom';
import { overlayAction, overlayClear, OverlayState } from '../redux/features/overlaySlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { ImageType } from '../typings';
import { IoMdClose } from 'react-icons/io';
import { Helmet } from 'react-helmet';

const Maps = () => {
  const mapRef = useRef(null);
  const dispatch = useDispatch();
  const overlay = useSelector((state: RootState) => state.overlay);
  const nowPosition = useSelector((state: RootState) => state.persistReducered.position);
  const navigate = useNavigate();
  const res = useQuery(['matchList'], async () => await apis.getAroundGame(nowPosition.lat, nowPosition.lng));
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    return () => {
      dispatch(overlayClear());
    };
  }, []);

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
        <section className='w-56 h-56 bg-white rounded-xl border border-matchgi-lightgray'>
          <div className='text-right mr-1'>
            <button className='text-sm' onClick={() => setIsOpen(false)}>
              <IoMdClose />
            </button>
          </div>
          <img src={overlay.imgUrl} alt='' className='w-full h-3/5 bg-slate-400'></img>
          <span className='flex flex-col'>
            <div className='text-sm'>{overlay.title}</div>
            <div className='text-sm'>{overlay.subject}</div>
            <div className='text-sm'>{overlay.address}</div>
            <button onClick={() => navigate(`/match/${overlay.postId}`)}>GO</button>
            <span className='flex flex-row justify-center'>
              <div className='w-16 overflow-hidden inline-block'>
                <div className='h-11 w-11 bg-white -rotate-45 transform origin-top-left'></div>
              </div>
            </span>
          </span>
        </section>
      );
    }
  };
  return (
    <>
      <Helmet>
        <title>매치기 | 근처찾기</title>
      </Helmet>
      <Map
        center={{ lat: nowPosition.lat, lng: nowPosition.lng }}
        className='relative w-full h-screen'
        level={3}
        ref={mapRef}
      >
        <ZoomControl position={window.kakao.maps.ControlPosition.TOPRRIGHT} />
        <CustomOverlayMap position={{ lat: overlay.lat, lng: overlay.lng }} xAnchor={0.5} yAnchor={1.1}>
          {MatchMarker()}
          {CustomOverlay()}
        </CustomOverlayMap>
      </Map>
    </>
  );
};

export default Maps;

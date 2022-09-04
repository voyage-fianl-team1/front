import React, { useRef, useState, useEffect } from 'react';
import { Map, ZoomControl, MapMarker, MarkerClusterer } from 'react-kakao-maps-sdk';
import { useQuery } from '@tanstack/react-query';
import { apis } from '../apis';
import { useNavigate } from 'react-router-dom';
import { overlayAction, overlayClear, OverlayState } from '../redux/features/overlaySlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { ImageType } from '../typings';
import { Helmet } from 'react-helmet';

const Maps = () => {
  const mapRef = useRef<any>(3);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState({});
  const [level, setLevel] = useState<number>(3);
  const overlay = useSelector((state: RootState) => state.overlay);
  const nowPosition = useSelector((state: RootState) => state.persistReducered.position);
  const res = useQuery(['matchList'], async () => await apis.getAroundGame(nowPosition.lat, nowPosition.lng));
  const [isOpen, setIsOpen] = useState(false);
  const matchData = res?.data?.data;

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

  if (res.isLoading) {
    return <></>;
  }
  return (
    <>
      <Helmet>
        <title>매치기 | 근처찾기</title>
      </Helmet>
      <Map
        center={{ lat: nowPosition.lat, lng: nowPosition.lng }}
        className='w-full h-screen'
        level={level}
        onZoomChanged={(map) => setLevel(map.getLevel())}
        ref={mapRef}
        onBoundsChanged={(map) =>
          setState({
            sw: map.getBounds().getSouthWest().toString(),
            ne: map.getBounds().getNorthEast().toString(),
          })
        }
      >
        <ZoomControl position={window.kakao.maps.ControlPosition.TOPRRIGHT} />
        <MarkerClusterer averageCenter={true} minLevel={10}>
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
        </MarkerClusterer>
        {isOpen && (
          <div className='flex flex-row items-center justify-center'>
            <div
              className='fixed bottom-[56px] w-11/12 max-w-[900px] h-[136px] bg-[#FFF] z-10 rounded-[10px]
          border border-[#DCDDE0] shadow-[0_4px_20px_rgba(0,0,0,0.08)]'
            >
              <div className='flex flex-row my-[24px]'>
                <div className='flex flex-row justify-center items-center ml-[20px]'>
                  <img
                    src={overlay.imgUrl == null ? '/assets/images/post/noImage.svg' : overlay.imgUrl}
                    alt='overlayImg'
                    className='w-[84px] h-[84px] border border-[#DCDDE0] rounded-[10px]'
                  />
                </div>
                <div className='flex flex-col justify-center gap-[8px] ml-[16px]'>
                  <div className='text-[16px] font-Noto leading-[150%] text-[#38393C]'>{overlay.title}</div>
                  <div className='text-[14px] font-Noto leading-[150%] text-[#717275]'>{overlay.address}</div>
                  <div
                    className='bg-[#F4F5F5] border border-[#F4F5F5] rounded-[4px] font-Noto text-[12px]
                leading-[150%] text-[#5D5E62] min-w-[30px] max-w-[45px] h-[18px] text-center'
                  >
                    {overlay.subject}
                  </div>
                  <button onClick={() => navigate(`/match/${overlay.postId}`)}>
                    <img src='/assets/images/post/right.svg' className='absolute w-[24px] h-[24px] right-3 top-14' />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Map>
    </>
  );
};

export default Maps;

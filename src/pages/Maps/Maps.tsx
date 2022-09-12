import React, { useState, useEffect } from 'react';
import { Map, ZoomControl, MapMarker, MarkerClusterer } from 'react-kakao-maps-sdk';
import { overlayAction, overlayClear, OverlayState } from '../../redux/features/overlaySlice';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { MarkerObj } from '../../shared/constant/makerTable';
import { useMaps } from '../../hooks/map/useMaps';
import { useMapList } from '../../hooks/queries/useMapList';
import LoadingSpinner from '../../components/Common/loadingSpinner';
import usePush from '../../hooks/usePush';

const Maps = () => {
  const { mapRef, nowPosition, overlay } = useMaps('');
  const { matchData, isLoading } = useMapList(nowPosition.lat, nowPosition.lng);
  const dispatch = useDispatch();
  const { push } = usePush();
  const [state, setState] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  // /api/posts/gps?NWlat=&Nwlng=&SElat=&SElng

  useEffect(() => {
    return () => {
      dispatch(overlayClear());
    };
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <Helmet>
        <title>매치기 | 근처찾기</title>
      </Helmet>
      <Map
        center={{ lat: nowPosition.lat, lng: nowPosition.lng }}
        className='w-full h-screen'
        level={3}
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
                  <button onClick={() => push(`/match/${overlay.postId}`)}>
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

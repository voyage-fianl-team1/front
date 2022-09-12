import React from 'react';
import { Map, ZoomControl, MapMarker } from 'react-kakao-maps-sdk';
import { useCalendar } from '../../hooks/modal/useCalendar';
import { useMap } from '../../hooks/map/useMap';
import Modal from './Modal';

const MapContainer = () => {
  const { handleToggleModal } = useCalendar('');
  const { mapRef, nowPosition, position, address, handleSendAddress, loadAddress, mousePosition } = useMap('');
  loadAddress();

  return (
    <Modal onClickToggleModal={handleToggleModal}>
      <Map
        center={{ lat: nowPosition.lat, lng: nowPosition.lng }}
        className='relative w-[100%] h-[100%]'
        level={3}
        ref={mapRef}
        onClick={mousePosition}
      >
        <ZoomControl position={window.kakao.maps.ControlPosition.TOPRRIGHT} />
        <MapMarker position={{ lat: position.lat, lng: position.lng }} />
        <div className='w-full h-[50px] flex justify-center items-center bg-[#FCFCFC] mt-3'>{address}</div>
        <span className='flex flex-row items-center gap-5 mt-3'>
          <button
            className='w-[82px] h-[45px] bg-[#FFF] text-[16px] text-[#38393C] leading-[19px] border border-[#9A9B9F]
            font-medium text-center rounded-[8px]'
            onClick={handleToggleModal}
          >
            닫기
          </button>
          <button
            className='w-[181px] h-[45px] bg-matchgi-btnblue text-[16px] text-[#FFF] leading-[19px]
            font-medium text-center rounded-[8px]'
            onClick={handleSendAddress}
          >
            선택
          </button>
        </span>
      </Map>
    </Modal>
  );
};

export default MapContainer;

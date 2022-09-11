import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper';

const GOOGLE_FORM_LINK = 'https://forms.gle/beTEFQw1Qottddon6';

const SlideBanner = () => {
  const navigate = useNavigate();
  return (
    <div className='mt-[20px] mb-[32px]'>
      <Swiper spaceBetween={50} slidesPerView={1} modules={[Autoplay]} autoplay={{ delay: 3000 }}>
        <SwiperSlide onClick={() => navigate('/map')} className='cursor-pointer'>
          <img src='/assets/images/banner/banner1.svg' alt='banner-01' className='w-[100%] h-[100%]' />
        </SwiperSlide>
        <SwiperSlide>
          <a href={GOOGLE_FORM_LINK} className='w-[100%] h-[100%] block' target='_blank' rel='noreferrer'>
            <img src='/assets/images/banner/banner2.svg' alt='banner-01' className='w-[100%] h-[100%]' />
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <img src='/assets/images/banner/banner3.svg' alt='banner-01' className='w-[100%] h-[100%]' />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SlideBanner;

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import 'swiper/css/autoplay';
import b1 from '../assets/banners/banner1.jpg';
import b2 from '../assets/banners/banner2.jpg';
import b3 from '../assets/banners/banner3.jpg';

export default function BannerSlider(){
  const slides = [b1,b2,b3];
  return (
    <div className="banner-wrap">
      <Swiper modules={[Autoplay]} autoplay={{ delay: 3000 }} loop slidesPerView={1}>
        {slides.map((s,i)=>(
          <SwiperSlide key={i}><img src={s} className="banner-img"  /></SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

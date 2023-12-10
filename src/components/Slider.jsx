import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'swiper/css/bundle';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { db } from '../config/firebase';
import { Price } from '../utils/helper';
import Spinner from './Spinner';

function Slider() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchFirstFiveListings() {
      const q = query(
        collection(db, 'listings'),
        orderBy('timestamp', 'desc'),
        limit(5)
      );
      const querySnapshot = await getDocs(q);
      const listings = [];
      querySnapshot.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setListings(listings);
      setLoading(false);
    }
    fetchFirstFiveListings();
  }, []);

  if (loading) {
    return <Spinner />;
  }
  if (listings.length === 0) {
    return <></>;
  }
  return (
    <div>
      <Swiper
        slidesPerView={1}
        navigation
        pagination={{ type: 'progressbar' }}
        effect="fade"
        modules={[EffectFade, Pagination, Navigation, Autoplay]}
        autoplay={{ delay: 3000 }}
      >
        {listings.map((listings, index) => (
          <SwiperSlide
            key={index}
            onClick={() => {
              navigate(`/category/${listings.data.type}/${listings.id}`);
            }}
          >
            <div
              className="relative w-full overflow-hidden h-[300px] "
              style={{
                background: `url(${listings.data.images[index]}) center no-repeat`,
                backgroundSize: 'cover',
              }}
            />
            <p className="text-[#f1faee] absolute left-1 top-3 font-medium max-w-[90%] bg-[#457b9d] shadow-lg opacity-90 p-2 rounded-br-3xl">
              {listings.data.name}
            </p>
            <p className="text-[#f1faee] absolute left-1 bottom-3 font-semibold max-w-[90%] bg-[#e63946] shadow-lg opacity-90 p-2 rounded-tr-3xl">
              $
              {Price(listings.data.discountedPrice) ??
                listings.data.regularPrice}
              {listings.data.type === 'rent' && ' / month'}
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Slider;

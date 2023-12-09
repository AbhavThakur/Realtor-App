import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'swiper/css/bundle';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Spinner from '../components/Spinner';
import { db } from '../config/firebase';

function Category() {
  const params = useParams();

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const getCategoryDetails = async () => {
      try {
        const docRef = doc(db, 'listings', params.listingId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();

          setListings(data);
          setLoading(false);
          console.warn(
            '🚀👨🏻‍💻👍 ~ file: Category.jsx:25 ~ getCategoryDetails ~ data:',
            data
          );
          // Do something with the category details
        } else {
          console.log('No category found');
        }
      } catch (error) {
        console.error('Error getting category details:', error);
      }
    };

    getCategoryDetails();
  }, [params.listingId]);

  if (loading) return <Spinner />;

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
        {listings.images.map((image, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full overflow-hidden h-[300px] "
              style={{
                background: `url(${listings.images[index]}) center no-repeat`,
                backgroundSize: 'cover',
              }}
            >
              <img
                src={image}
                alt={listings.title}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <h1>{listings.title}</h1>
      <p>{listings.description}</p>
    </div>
  );
}

export default Category;

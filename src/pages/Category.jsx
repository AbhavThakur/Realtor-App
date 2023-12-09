import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FaShare } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
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
  async function copyUrlToClipboard() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  }
  if (loading) return <Spinner />;

  return (
    <main>
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
      <div className="fixed top-[13%] right-[2%] z-10 bg-white cursor-pointer border-2 border-gray-400 rounded-full w-12 h-12 flex items-center justify-center">
        <button onClick={copyUrlToClipboard} aria-label="Share">
          <FaShare size={20} className="text-slate-400" />
        </button>
      </div>

      <h1>{listings.title}</h1>
      <p>{listings.description}</p>
    </main>
  );
}

export default Category;

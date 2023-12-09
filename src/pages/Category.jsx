import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaParking,
  FaShare,
} from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'swiper/css/bundle';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ContactForm } from '../components';
import Spinner from '../components/Spinner';
import { auth, db } from '../config/firebase';
import { Price } from '../utils/helper';

function Category() {
  const params = useParams();

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Contact, setContact] = useState(false);

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
      {/* Share */}
      <div className="fixed top-[13%] right-[2%] z-10 bg-white cursor-pointer border-2 border-gray-400 rounded-full w-12 h-12 flex items-center justify-center">
        <button onClick={copyUrlToClipboard} aria-label="Share">
          <FaShare size={20} className="text-slate-400" />
        </button>
      </div>
      {/* --- End of share --- */}

      {/* Map and Info */}
      <div className="flex flex-col md:flex-row  max-w-6xl lg:mx-auto p-4 rounded-lg shadow-lg  bg-white lg:space-x-5 mt-4">
        {/* Info */}
        <div className=" w-full  mr-2">
          <p className="text-2xl font-bold mb-3 text-blue-700 ">
            {listings.name} - Rs{' '}
            {listings.offer
              ? Price(listings.discountedPrice)
              : Price(listings.regularPrice)}
            {listings.type === 'rent' ? '/month' : ''}
          </p>
          <p className="flex items-center mt-6 mb-3 font-semibold ">
            <FaMapMarkedAlt className="text-green-700 mr-1" />{' '}
            {listings.address}
          </p>
          <div className="flex items-center space-x-4 w-[75%]">
            <p className="bg-red-800 w-full max-w-[200px] rounded-md p-1 text-white text-center shadow-md">
              {listings.type === 'rent' ? 'Rent' : 'Sale'}
            </p>
            {listings.offer && (
              <p className="w-full max-w-[200px] bg-green-800 rounded-md p-1 text-white text-center shadow-md">
                Rs {Price(listings.regularPrice - listings.discountedPrice)} off
              </p>
            )}
          </div>
          {/* Description */}
          <p className="mt-3 mb-3">
            <span className="font-semibold">Description - </span>
            {listings.description}
          </p>
          {/* --- End of description --- */}
          {/* List of amenities */}
          <ul className="mb-4 flex items-center space-x-2 sm:space-x-10 text-sm">
            <li className="flex items-center whitespace-nowrap">
              <FaBed className="text-red-500 mr-1" />
              {listings.bedrooms > 1
                ? `${listings.bedrooms} Bedrooms`
                : '1 Bedroom'}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaBath className="text-red-500 mr-1" />
              {listings.bathrooms > 1
                ? `${listings.bathrooms} Bathrooms`
                : '1 Bathroom'}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaParking className="text-red-500 mr-1" />
              {listings.parking ? 'Parking Spot' : 'No Parking'}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaChair className="text-red-500 mr-1" />
              {listings.furnished ? 'Furnished' : 'Not Furnished'}
            </li>
          </ul>
          {/* End of list of amenities */}
          {/* Contact */}
          {listings.userRef !== auth.currentUser?.uid && (
            <div>
              {Contact ? (
                <ContactForm listing={listings} userRef={listings.userRef} />
              ) : (
                <button
                  onClick={() => setContact(true)}
                  className="w-full bg-blue-700 text-white font-medium rounded-md px-4 py-2 hover:bg-blue-800 shadow-md hover:shadow-lg transition duration-150 ease-in-out"
                >
                  Contact Agent
                </button>
              )}
            </div>
          )}

          {/* End of contact */}
        </div>
        {/* --- End of info --- */}
        <div className="bg-red-400 w-full h-[200px] lg-[400px] z-10 overflow-x-hidden"></div>
      </div>
      {/* --- End of map and info --- */}
    </main>
  );
}

export default Category;

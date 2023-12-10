import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ListingItem } from '../components';
import Slider from '../components/Slider';
import Spinner from '../components/Spinner';
import { db } from '../config/firebase';
function Home() {
  const [OfferListings, setOfferListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFirstFiveListings() {
      const q = query(
        collection(db, 'listings'),
        where('offer', '==', true),
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

      setOfferListings(listings);
    }
    async function RentListings() {
      const q = query(
        collection(db, 'listings'),
        where('type', '==', 'rent'),
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

      setRentListings(listings);
    }

    async function SaleListings() {
      const q = query(
        collection(db, 'listings'),
        where('type', '==', 'sale'),
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
      console.warn(
        '🚀👨🏻‍💻👍 ~ file: Home.jsx:68 ~ SaleListings ~ listings:',
        listings
      );
      setSaleListings(listings);
    }
    SaleListings();
    RentListings();
    fetchFirstFiveListings();
    setLoading(false);
  }, []);

  const ShowMore = () => {
    return (
      <p className="text-right text-blue-600 hover:text-blue-800   transition ease-in-out duration-150 ">
        Show more offers
      </p>
    );
  };

  const TitleComponent = (props) => {
    return <h2 className="text-2xl font-semibold px-3 mt-6">{props.title}</h2>;
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Slider />
      <div className="max-w-6xl mx-auto pt-4 space-y-6">
        {OfferListings && OfferListings.length > 0 && (
          <div className="p-2">
            <TitleComponent title="Recent offers" />
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 ">
              {OfferListings.map((offerlisting) => (
                <ListingItem
                  key={offerlisting.id}
                  id={offerlisting.id}
                  data={offerlisting.data}
                />
              ))}
            </ul>
            <Link to="/offers">
              <ShowMore />
            </Link>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className="p-2">
            <TitleComponent title="Places for rent" />
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 ">
              {rentListings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  data={listing.data}
                />
              ))}
            </ul>
            <Link to="/category/rent">
              <ShowMore />
            </Link>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="p-2">
            <TitleComponent title="Places for sale" />
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 ">
              {saleListings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  data={listing.data}
                />
              ))}
            </ul>
            <Link to="/category/sale">
              <ShowMore />
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;

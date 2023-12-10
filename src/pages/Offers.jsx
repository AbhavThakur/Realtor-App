import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ListingItem } from '../components';
import Spinner from '../components/Spinner';
import { db } from '../config/firebase';

function Offers() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastFetchedListing, setLastFetchedListing] = useState(null);

  useEffect(() => {
    async function fetchListings() {
      const q = query(
        collection(db, 'listings'),
        where('offer', '==', true),
        orderBy('timestamp', 'desc'),
        limit(8)
      );
      const querySnapshot = await getDocs(q);
      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      setLastFetchedListing(lastVisible);
      const listingsData = [];
      querySnapshot.forEach((doc) => {
        return listingsData.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listingsData);
      setLoading(false);
    }
    fetchListings();
  }, []);

  const onFetchMoreListings = async () => {
    setLoading(true);
    const q = query(
      collection(db, 'listings'),
      where('offer', '==', true),
      orderBy('timestamp', 'desc'),
      startAfter(lastFetchedListing),
      limit(4)
    );
    const querySnapshot = await getDocs(q);
    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    setLastFetchedListing(lastVisible);
    const listingsData = [];
    querySnapshot.forEach((doc) => {
      return listingsData.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    setListings((prevListings) => [...prevListings, ...listingsData]);
    setLoading(false);
  };

  if (loading) {
    return <Spinner />;
  }
  if (listings.length === 0) {
    return (
      <div>
        <p>No offers available</p>
      </div>
    );
  }
  return (
    <div>
      <p className="text-2xl font-bold mb-4 text-center mt-4">Offers</p>
      <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {listings.map((listing) => (
          <ListingItem key={listing.id} id={listing.id} data={listing.data} />
        ))}
      </ul>
      {lastFetchedListing && (
        <div className="flex justify-center items-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
            onClick={onFetchMoreListings}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default Offers;

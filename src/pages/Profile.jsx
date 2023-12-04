import { updateProfile } from 'firebase/auth';
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FcHome } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FormButton, ListingItem } from '../components';
import { auth, db } from '../config/firebase';
import { SignOut } from '../hooks/AuthProvider';
function Profile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [FormData, setFormData] = useState({
    name: auth.currentUser?.displayName,
    email: auth.currentUser?.email,
  });

  const [changeName, setChangeName] = useState(false);

  const { name, email } = FormData;

  useEffect(() => {
    setLoading(true);
    const callListingsData = async () => {
      const userId = auth.currentUser.uid;
      const q = query(
        collection(db, 'listings'),
        where('userRef', '==', userId),
        orderBy('timestamp', 'desc')
      );
      const querySnapshot = await getDocs(q);

      let listings = [];

      querySnapshot.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
    };

    // Call the function to retrieve the listings data
    callListingsData();
  }, []);

  const onSubmit = async () => {
    if (!name) {
      toast.error('Please fill in all fields');
      return;
    }
    try {
      if (name !== auth.currentUser.displayName) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        //update in firestore
        await updateDoc(doc(db, 'users', auth.currentUser.uid), {
          name,
        });
        toast.success('Profile updated successfully');
      } else if (name === auth.currentUser.displayName) {
        setChangeName(false);
        return;
      }
    } catch (error) {
      const errorMessage = error.message;
      toast.error(errorMessage);
    }

    setChangeName(false);
  };
  return (
    <>
      <section className="max-w-6xl mx-auto  flex justify-center items-center flex-col ">
        <h1 className={'Header'}>Profile</h1>
        <div className="w-full md:w-[50%] mt-6 px-3">
          <form>
            {/* Name */}
            <input
              value={name}
              type="text"
              id="name"
              disabled={!changeName}
              onChange={(e) =>
                setFormData({ ...FormData, name: e.target.value })
              }
              placeholder="Name"
              className={`FormInput ${
                changeName && 'bg-red-200 focus:bg-red-200'
              }`}
            />
            {/* Email */}
            <input
              value={email}
              type="email"
              placeholder="Email"
              id="email"
              disabled
              className="FormInput"
            />

            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p>
                Do you want to change your name?
                <span
                  onClick={() => {
                    if (changeName === false) {
                      setChangeName(true);
                    } else {
                      onSubmit();
                    }
                  }}
                  className="LinkButton"
                >
                  {changeName ? 'Apply change' : 'Edit'}
                </span>
              </p>
              <p
                onClick={() => SignOut().then(() => navigate('/'))}
                className="LinkButtonRight"
              >
                Sign out
              </p>
            </div>
          </form>
          <FormButton
            onClick={() => navigate('/create-listing')}
            title="Sell or Rent your Home"
            icon={<FcHome size={17} className="mr-2 " />}
          />
        </div>
      </section>
      <div className="max-w-6xl mx-auto mt-6 px-3">
        {!loading && listings.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold text-center mb-6">
              My listings
            </h2>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 ">
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  data={listing.data}
                  navigate={navigate}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
}

export default Profile;

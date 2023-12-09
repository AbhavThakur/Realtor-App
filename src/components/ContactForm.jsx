import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { db } from '../config/firebase';

function Contact({ userRef, listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState('');
  useEffect(() => {
    const LandLordDetails = async () => {
      const docRef = doc(db, 'users', userRef);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLandlord(docSnap.data());
      } else {
        toast.error('Could not get landlord data');
      }
    };
    LandLordDetails();
  }, [userRef]);

  return (
    <>
      {landlord !== null && (
        <div>
          <p className="text-center my-4">
            Contact {landlord?.name} for the {listing?.name.toLowerCase()}
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            className="w-full p-2  mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500 "
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <a
            href={`mailto:${landlord.email}?Subject=${listing.name}&body=${message}`}
          >
            <button className="bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800 w-full">
              Send Message
            </button>
          </a>
        </div>
      )}
    </>
  );
}

export default Contact;

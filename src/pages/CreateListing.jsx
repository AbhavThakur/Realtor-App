import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { FormButton } from '../components';
import Spinner from '../components/Spinner';
import { auth, db, storage } from '../config/firebase';
import { errors, options } from '../utils/helper';

const APIkey = 'f440762ba8e54ac2b2ac043d4180cd09';

function CreateListing() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [FormData, setFormData] = useState({
    type: 'rent',
    name: '',
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: '',
    description: '',
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    images: [],
    latitude: 0,
    longitude: 0,
  });
  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    description,
    offer,
    regularPrice,
    discountedPrice,
    images,
    latitude,
    longitude,
  } = FormData;

  const ButtonOptionComponent = (props) => {
    if (props.category === 'type') {
      return (
        <button
          onClick={props.onClick}
          className={`w-full mr-4 py-2 shadow-md rounded hover:bg-gray-800 transition duration-150 ease-in-out uppercase ${
            type === props.typeValue
              ? 'bg-gray-800 text-white'
              : 'bg-white text-black'
          } `}
        >
          {props.title}
        </button>
      );
    } else if (props.category === 'Furnished') {
      return (
        <button
          onClick={props.onClick}
          className={`w-full mr-4 py-2 shadow-md rounded hover:bg-gray-800 transition duration-150 ease-in-out uppercase ${
            furnished === props.typeValue
              ? 'bg-gray-800 text-white'
              : 'bg-white text-black'
          } `}
        >
          {props.title}
        </button>
      );
    } else if (props.category === 'Parking') {
      return (
        <button
          onClick={props.onClick}
          className={`w-full mr-4 py-2 shadow-md rounded hover:bg-gray-800 transition duration-150 ease-in-out uppercase ${
            parking === props.typeValue
              ? 'bg-gray-800 text-white'
              : 'bg-white text-black'
          } `}
        >
          {props.title}
        </button>
      );
    } else if (props.category === 'Offer') {
      return (
        <button
          onClick={props.onClick}
          className={`w-full mr-4 py-2 shadow-md rounded hover:bg-gray-800 transition duration-150 ease-in-out uppercase ${
            offer === props.typeValue
              ? 'bg-gray-800 text-white'
              : 'bg-white text-black'
          } `}
        >
          {props.title}
        </button>
      );
    }
  };

  const TitleComponent = (props) => {
    return <p className="text-xl font-semibold mt-6 mb-2">{props.title}</p>;
  };

  const styles = {
    label: 'block text-gray-700 text-sm font-bold mb-2',
    input:
      'w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out',
  };

  const onChange = (e) => {
    // Files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }
  };

  const [location, setLocation] = useState();

  function getLocationInfo(latitude, longitude) {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${APIkey}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status.code === 200) {
          console.log('results:', data.results);
          setLocation(data.results[0].formatted);
        } else {
          console.log('Reverse geolocation request failed.');
        }
      })
      .catch((error) => console.error(error));
  }

  function success(pos) {
    var crd = pos.coords;
    setFormData((prevState) => ({
      ...prevState,
      latitude: crd.latitude,
      longitude: crd.longitude,
    }));

    // getLocationInfo(crd.latitude, crd.longitude);
  }

  function getCoordinates() {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then(function (result) {
          console.log(result);
          if (result.state === 'granted') {
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === 'prompt') {
            //If prompt then the user will be asked to give permission
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === 'denied') {
            //If denied then you have to show instructions to enable location
            toast.error('Please enable location');
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }

  useEffect(() => {
    setLoading(true);
    getCoordinates();
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    if (latitude === 0 || longitude === 0) {
      getCoordinates();
      toast.error('Please enable location and try again');
      return;
    }
    if (images.length < 1) {
      toast.error('Please add at least one image');
      return;
    }
    if (images.length > 6) {
      toast.error('Max 6 images');
      return;
    }
    if (!name || !description) {
      toast.error('Please fill in all fields');
      return;
    }
    setLoading(true);
    const imagesUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch(() => {
      toast.error('Images not uploaded');
      return;
    });

    console.log(imagesUrls);
    const formDataCopy = {
      ...FormData,
      images: imagesUrls,
      geolocation: {
        latitude,
        longitude,
      },
      userRef: auth.currentUser.uid,
      timestamp: serverTimestamp(),
    };
    !formDataCopy.offer && delete formDataCopy.discountedPrice;

    const docRef = await addDoc(collection(db, 'listings'), formDataCopy);
    setLoading(false);
    toast.success('Listing created');
    navigate(`/profile`);
    // navigate('/category/' + formDataCopy.type + '/' + docRef.id);
  }

  const storeImage = async (image) => {
    return new Promise((resolve, reject) => {
      const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
      const storageRef = ref(storage, `images/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <main className="max-w-md mx-auto px-2 pb-10">
      <h1 className={'Header'}>Create Listing</h1>
      <form onSubmit={onSubmit}>
        {/* Sell or Rent */}
        <TitleComponent title="Sell / Rent" />
        <div className="flex">
          <ButtonOptionComponent
            title="Rent"
            category="type"
            typeValue="rent"
            onClick={() => setFormData({ ...FormData, type: 'rent' })}
          />
          <ButtonOptionComponent
            title="Sell"
            category="type"
            onClick={() => setFormData({ ...FormData, type: 'sell' })}
            typeValue="sell"
          />
        </div>
        {/* Name */}
        <TitleComponent title="Name" />
        <input
          id="name"
          maxLength="32"
          placeholder="Name"
          type="text"
          minLength="5"
          value={name}
          className={styles.input}
          onChange={(e) => setFormData({ ...FormData, name: e.target.value })}
        />
        {/* Bed & Bath */}
        <div className="flex">
          <div className="w-1/2">
            <TitleComponent title="Bedrooms" />
            <input
              type="number"
              min="1"
              max="50"
              required
              value={bedrooms}
              onChange={(e) =>
                setFormData({ ...FormData, bedrooms: e.target.value })
              }
            />
          </div>
          <div>
            <TitleComponent title="Bathrooms" />
            <input
              type="number"
              min="1"
              max="50"
              required
              value={bathrooms}
              onChange={(e) =>
                setFormData({ ...FormData, bathrooms: e.target.value })
              }
            />
          </div>
        </div>
        {/* Parking */}
        <TitleComponent title="Parking" />
        <div className="flex">
          <ButtonOptionComponent
            onClick={() => setFormData({ ...FormData, parking: true })}
            typeValue={true}
            category="Parking"
            title="Yes"
          />
          <ButtonOptionComponent
            onClick={() => setFormData({ ...FormData, parking: false })}
            typeValue={false}
            category="Parking"
            title="No"
          />
        </div>
        {/* Furnished */}
        <TitleComponent title="Furnished" />
        <div className="flex">
          <ButtonOptionComponent
            onClick={() => setFormData({ ...FormData, furnished: true })}
            typeValue={true}
            category="Furnished"
            title="Yes"
          />
          <ButtonOptionComponent
            onClick={() => setFormData({ ...FormData, furnished: false })}
            typeValue={false}
            category="Furnished"
            title="No"
          />
        </div>
        {/* Address */}
        <TitleComponent title="Address" />
        <textarea
          id="address"
          placeholder="Address"
          type="text"
          value={address || location}
          className={styles.input}
          onChange={(e) =>
            setFormData({ ...FormData, address: e.target.value })
          }
        />

        {/* Latitude */}
        <div>
          <TitleComponent title="Latitude" />
          <input
            id="latitude"
            type="number"
            value={latitude}
            min="-90"
            max="90"
            step="any"
            required
            className={styles.input}
            onChange={(e) =>
              setFormData({ ...FormData, latitude: e.target.value })
            }
          />
        </div>
        {/* Longitude */}
        <div>
          <TitleComponent title="Longitude" />
          <input
            id="longitude"
            type="number"
            value={longitude}
            min="-180"
            max="180"
            step="any"
            required
            className={styles.input}
            onChange={(e) =>
              setFormData({ ...FormData, longitude: e.target.value })
            }
          />
        </div>

        {/* Description */}
        <TitleComponent title="Description" />
        <textarea
          id="description"
          placeholder="Description"
          type="text"
          value={description}
          className={styles.input}
          onChange={(e) =>
            setFormData({ ...FormData, description: e.target.value })
          }
        />
        {/* Offer */}
        <TitleComponent title="Offer" />
        <div className="flex">
          <ButtonOptionComponent
            onClick={() => setFormData({ ...FormData, offer: true })}
            typeValue={true}
            category="Offer"
            title="Yes"
          />
          <ButtonOptionComponent
            onClick={() => setFormData({ ...FormData, offer: false })}
            typeValue={false}
            category="Offer"
            title="No"
          />
        </div>
        {/* Regular Price */}
        <TitleComponent title="Regular Price" />
        <div className="flex justify-center items-center">
          <input
            id="regularPrice"
            type="number"
            min="0"
            max="999999999"
            required
            value={regularPrice}
            onChange={(e) =>
              setFormData({ ...FormData, regularPrice: e.target.value })
            }
            className={styles.input}
          />
          {type === 'rent' && (
            <p className="text-xl w-1/3 text-right whitespace-nowrap">
              rs / Month
            </p>
          )}
        </div>
        {/* Discounted Price */}
        {offer && (
          <div>
            <TitleComponent title="Discounted Price" />
            <div className="flex justify-center items-center">
              <input
                id="discountedPrice"
                type="number"
                min="0"
                max="999999999"
                required
                value={discountedPrice}
                onChange={(e) =>
                  setFormData({ ...FormData, discountedPrice: e.target.value })
                }
                className={styles.input}
              />
              {type === 'rent' && (
                <p className="text-xl w-1/3 text-right whitespace-nowrap">
                  $ / Month
                </p>
              )}
            </div>
          </div>
        )}
        {/* Images  */}
        <TitleComponent title="Images" />
        <p className="text-sm mb-2">
          The first image will be the cover (max 6 images) & images should be
          less than 2MB.
        </p>
        <input
          type="file"
          id="images"
          multiple
          required
          onChange={onChange}
          accept=".jpg, .png, .jpeg"
          className={styles.input}
        />
        <FormButton title="Create Listing" />
      </form>
    </main>
  );
}

export default CreateListing;

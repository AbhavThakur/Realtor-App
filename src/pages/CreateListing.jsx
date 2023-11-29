import { useState } from 'react';
import { FormButton } from '../components';

function CreateListing() {
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
    let boolean = null;
    if (e.target.value === 'true') {
      boolean = true;
    }
    if (e.target.value === 'false') {
      boolean = false;
    }
  };
  function onSubmit(e) {
    e.preventDefault();
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
          minLength="10"
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
          value={address}
          className={styles.input}
          onChange={(e) =>
            setFormData({ ...FormData, address: e.target.value })
          }
        />
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
              $ / Month
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
          The first image will be the cover (max 6)
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

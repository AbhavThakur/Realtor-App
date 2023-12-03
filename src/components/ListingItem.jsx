import React from 'react';
import { MdLocationOn } from 'react-icons/md';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const ListingItem = ({
  id,
  data: {
    name,
    images,
    type,
    timestamp,
    address,
    offer,
    regularPrice,
    discountedPrice,
    rooms,
    bathrooms,
    bedrooms,
    parking,
    furnished,
  },
  navigate,
}) => (
  <div
    key={id}
    className="mb-5  bg-gray-100 rounded-2xl shadow-md cursor-pointer hover:shadow-lg transition duration-150 ease-in-out"
  >
    <Link to={`/category/${type}/${id}`}>
      <div className="flex flex-col items-center justify-center">
        <img
          className="w-full  object-cover rounded-tl-2xl rounded-tr-2xl"
          src={images[0]}
          alt=""
        />
        <Moment fromNow>{timestamp?.toDate()}</Moment>
        {/* address */}
        <div className="flex items-center space-x-1">
          <MdLocationOn />
          <p>{address}</p>
        </div>
        {/*  */}
        <h2>{name}</h2>
        <p>
          $
          {offer
            ? discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            : regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          {type === 'rent' && ' / month'}
        </p>
        {/* bedrooms */}
        <div>
          <div>
            <p>
              {bedrooms} {bedrooms > 1 ? 'Bedrooms' : 'Bedroom'}
            </p>
          </div>
          <div>
            <p>
              {bathrooms} {bathrooms > 1 ? 'Bathrooms' : 'Bathroom'}
            </p>
          </div>
        </div>
      </div>
    </Link>
  </div>
);

export default ListingItem;

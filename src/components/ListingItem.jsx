import React from 'react';
import { MdDelete, MdEdit, MdLocationOn } from 'react-icons/md';
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
  onEdit,
  onDelete,
}) => (
  <li
    key={id}
    className="relative flex flex-col items-center justify-between mb-5  bg-white rounded-2xl shadow-md cursor-pointer hover:shadow-lg transition duration-150 ease-in-out overflow-hidden m-[10px]"
  >
    <Link className="contents" to={`/category/${type}/${id}`}>
      <img
        className="h-[170px] w-full object-cover hover:scale-105 transition duration-200 ease-in"
        loading="lazy"
        src={images[0]}
        alt=""
      />
      <Moment
        className="absolute top-2 left-2 bg-[#3377cc] text-white uppercase text-xs font-semibold rounded-md px-2 py-1 shadow-lg "
        fromNow
      >
        {timestamp?.toDate()}
      </Moment>
      {/* Text Container */}
      <div className="w-full p-[10px]">
        {/* address */}
        <div className="flex items-center space-x-1">
          <MdLocationOn className="h-4 w-4 text-green-600" />
          <p className="font-semibold text-sm text-gray-600 truncate">
            {address}
          </p>
        </div>
        {/*  */}
        <p className="font-bold m-0 text-xl  truncate">{name}</p>
        <p className="text-[#457b9d] mt-2 font-semibold">
          $
          {offer
            ? discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            : regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          {type === 'rent' && ' / month'}
        </p>
        {/* bedrooms & bathrooms container */}
        <div className="flex items-center mt-[10px] space-x-3">
          <div className="flex items-center space-x-1">
            <p className="font-bold text-sm">
              {bedrooms} {bedrooms > 1 ? 'Beds' : 'Bed'}
            </p>
          </div>
          <div className="flex items-center space-x-1">
            <p className="font-bold text-sm">
              {bathrooms} {bathrooms > 1 ? 'Baths' : 'Bath'}
            </p>
          </div>
        </div>
      </div>
    </Link>
    {onDelete && (
      <div>
        <MdDelete
          className="absolute bottom-2 right-2 h-5 w-5 text-red-500 cursor-pointer"
          onClick={onDelete}
        />
      </div>
    )}
    {onEdit && (
      <div>
        <MdEdit
          className="absolute bottom-2 right-8 h-5 w-5 text-blue-500 cursor-pointer"
          onClick={onEdit}
        />
      </div>
    )}
  </li>
);

export default ListingItem;

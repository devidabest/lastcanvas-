import React from 'react';
import { BiHighlight } from "react-icons/bi";
import { FaRegStar } from "react-icons/fa6";

const Card = ({ title, image, description, edited }) => {
  return (
    <div className="relative w-64 rounded overflow-hidden shadow-lg bg-white group">
      <img className="w-full h-32 object-cover" src={image} alt="Preview" />
      <div className="px-4 py-2">
        <div className="font-bold text-lg mb-2">{title}</div>
        <p className="text-gray-700 text-sm">{description}</p>
      </div>
      <div className="px-4 pt-2 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2">
          Edited {edited}
        </span>
      </div>

      
      <div className="absolute top-2 left-2 right-2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="bg-blue-500 text-white p-2 rounded-full">
          <BiHighlight />
        </button>
        <button className="bg-red-500 text-white p-2 rounded-full">
          <FaRegStar />
        </button>
      </div>
    </div>
  );
}

export default Card;

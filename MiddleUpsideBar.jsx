import { useState } from "react";
import {Link} from 'react-router-dom';

export default function MiddleUpsideBar() {
  
  const [isOpen, setIsOpen] = useState(false);

  const toggleList = () => {
    setIsOpen(!isOpen);
  };



  return (
    
    <div className=" border-b-2 border-black w-full flex items-center justify-between px-4 py-2 bg-white shadow-md">
      <p className=" text-black font-medium">Recents</p>
      <div className="relative">
        <button
          onClick={toggleList}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >

          <img
            src="/logo.png"
            alt="Logo"
            className="w-6 h-6 mr-2"
          />
            Create New 
        
        </button>
        {isOpen && (
          <ul className="absolute left-0 mt-2 bg-white border rounded shadow-md w-40">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"> <Link to="/SecondPage">  Design file </Link></li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">FigJam board</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Slide deck</li>
            <hr className="my-2 border-t border-gray-300" />
            <li className="px-4 py-1 hover:bg-gray-100 cursor-pointer">Import</li>
          </ul>
        )}
      </div>
    </div>
  );
}

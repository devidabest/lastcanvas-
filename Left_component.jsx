import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoTimeOutline } from "react-icons/io5";
import { CiFileOn } from "react-icons/ci";
import { FaCubes, FaRegFolder, FaRegArrowAltCircleUp, FaRegTrashAlt } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import placeholder from './assets/placeholder.png';
import UserList from "./UserList";  

const user = {
  name: "Amine bouchnak",
  email: "user@example.com",
  photo: placeholder  
};

export default function LeftComponent() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleList = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className="w-64 h-screen bg-gray-100 p-4 border-2 border-r-black">
     <div className="flex items-center mb-4 relative">
        <button className="text-lg font-bold flex items-center" onClick={toggleList}>
          <img
            src={user.photo}
            alt="Profile"
            className="rounded-full w-10 h-10 mr-3"
          />
          <div>{user.name}</div>
        </button>
        {isOpen && <UserList isOpen={isOpen} closeDropdown={closeDropdown} user={user} />}
      </div>

      <div className="mb-4 flex items-center border rounded">
        <CiSearch className="mr-2 ml-2 text-gray-500" />
        <input
          type="text"
          placeholder="Search for anything"
          className="w-full px-3 py-2 border-none"
        />
      </div>

      <div className="mb-4">
        <div className="flex items-center mb-2">
          <IoTimeOutline className="mr-2 text-gray-500" />
          <h3 className="text-black font-semibold">Recents</h3>
        </div>
        <div className="pl">
          <button className="px-4 py-2 hover:bg-gray-300 rounded cursor-pointer">Amine bouchnak's team library</button>
          <button className="px-4 py-2 hover:bg-gray-300 rounded cursor-pointer">FigJam basics</button>
          <button className="px-4 py-2 hover:bg-gray-300 rounded cursor-pointer">Figma basics</button>
        </div>
      </div>

      <div className="mb-4">
        <button onClick={toggleList} className="flex items-center px-4 py-2 text-black rounded hover:bg-gray-300">
          Amine bouchnak's team
        </button>
        {isOpen && (
          <ul className="mt-2 bg-white border rounded shadow-md">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Amine bouchnak's team</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Create new</li>
          </ul>
        )}
        <span className="text-sm text-gray-500">Free</span>
        <ul>
          <div>
            <button className="rounded hover:bg-gray-300 px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center">
              <CiFileOn className="mr-2" />
              Drafts
            </button>
            <button className="rounded hover:bg-gray-300 px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center">
              <FaCubes className="mr-2" />
              All projects
            </button>
            <button className="rounded hover:bg-gray-300 px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center">
              <FaRegTrashAlt className="mr-2" />
              Trash
            </button>
          </div>
        </ul>
      </div>

      <div className="mb-4 border-2 border-gray-400 rounded-lg p-4 text-center">
        <div className="flex flex-col items-center">
          <FaRegArrowAltCircleUp className="mb-2" />
          <p className="text-pretty">
            Ready to go beyond this free plan? <br /> Upgrade for premium features.
          </p>
        </div>
        <button className="hover:bg-blue-600 px-4 py-2 w-full bg-blue-500 text-white rounded mt-4">View plans</button>
      </div>

      <div className="mb-4">
        <h3 className="text-gray-700 font-semibold">Starred</h3>
        <div>
          <button className="px-4 py-2 hover:bg-gray-300 rounded cursor-pointer flex items-center">
            <FaRegFolder className="mr-2" />
            Team project
          </button>
        </div>
      </div>

      <div className="flex flex-col min-h-screen">
        <div className="flex-grow"></div>
        <div className="flex flex-col min-h-screen justify-end">
          <div className="mb-auto"></div>
          <div>
            <a href="#" className="text-blue-500 flex items-center ml-2">
              <TbWorld className="size-6" />
              Explore Community
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

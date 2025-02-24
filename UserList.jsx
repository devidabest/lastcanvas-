import React from 'react';
import { VscColorMode } from "react-icons/vsc";
import { GiSettingsKnobs } from "react-icons/gi";
import { IoMdDownload } from "react-icons/io";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import placeholder from './assets/placeholder.png'; 

const UserList = ({ isOpen, closeDropdown, user }) => {
  return (
    isOpen && (
      <ul className="mt-96 absolute left-0 mt-10 w-64 bg-white shadow-md rounded-lg z-10">
        <li className="border-b">
          <button onClick={closeDropdown} className="flex items-center w-full text-left px-4 py-3 hover:bg-gray-300 cursor-pointer focus:outline-none focus:bg-gray-200 border border-gray-300">
            <VscColorMode className='mr-3' />
            Theme
          </button>
        </li>
        <li className="border-b">
          <button onClick={closeDropdown} className="flex items-center w-full text-left px-4 py-3 hover:bg-gray-300 cursor-pointer focus:outline-none focus:bg-gray-200 border border-gray-300">
            <GiSettingsKnobs className='mr-3' />
            Settings
          </button>
        </li>
        <li className="border-b">
          <button onClick={closeDropdown} className="flex items-center w-full text-left px-4 py-3 hover:bg-gray-300 cursor-pointer focus:outline-none focus:bg-gray-200 border border-gray-300">
            <IoMdDownload className='mr-3'/>
            Get desktop app
          </button>
        </li>
        <li className="border-b">
          <button onClick={closeDropdown} className="flex items-center w-full text-left px-4 py-3 hover:bg-gray-300 cursor-pointer focus:outline-none focus:bg-gray-200 border border-gray-300">
            <img className="rounded-full w-5 h-5 mr-3" src={placeholder} alt="user" />
            Create a community profile
          </button>
        </li>
        <li className="border-b">
          <button onClick={closeDropdown} className="flex items-center w-full text-left px-4 py-3 hover:bg-gray-300 cursor-pointer focus:outline-none focus:bg-gray-200 border border-gray-300">
            <img className="rounded-full w-5 h-5 mr-3" src={user.photo} alt={user.name} />
            <div>
              <div>{user.name}</div>
              <div className="text-xs text-gray-500">{user.email}</div>
            </div>
          </button>
        </li>
        <li className="border-b">
          <button onClick={closeDropdown} className="flex items-center w-full text-left px-4 py-3 hover:bg-gray-300 cursor-pointer focus:outline-none focus:bg-gray-200 border border-gray-300">
            <IoIosAddCircleOutline className='mr-3' />
            Add account
          </button>
        </li>
        <li className="border-b">
          <button onClick={closeDropdown} className="flex items-center w-full text-left px-4 py-3 hover:bg-gray-300 cursor-pointer focus:outline-none focus:bg-gray-200 border border-gray-300">
            <MdLogout className='mr-3' />
            Log out
          </button>
        </li>
      </ul>
    )
  );
};

export default UserList;

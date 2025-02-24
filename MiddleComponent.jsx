import React from 'react';
import MiddleUpsideBar from './MiddleUpsideBar';
import { MdOutlineDraw } from "react-icons/md";
import { FaClipboard } from "react-icons/fa";
import { PiSlideshowLight } from "react-icons/pi";
import { LuImport } from "react-icons/lu";
import Card from './Card';

export default function MiddleComponent() {
  const cards = [
    {
      id: 1,
      title: "amine bouchnak's team library",
      image: "./src/assets/card1.png",
      description: "Build your own team library",
      edited: "9 months ago"
    },
    {
      id: 2,
      title: "FigJam basics",
      image:"./src/assets/card2.png",
      description: "FigJam basics",
      edited: "9 months ago"
    },
    {
      id: 3,
      title: "Figma basics",
      image: "./src/assets/card3.png",
      description: "Figma basics",
      edited: "9 months ago"
    }
  ];

  return (
    <div className="flex flex-col h-screen">
      <div className="w-full bg-gray-900">
        <MiddleUpsideBar />
      </div>

      <div className="flex flex-wrap gap-2 justify-center my-4">
        <button className="hover:bg-orange-500 border-2 border-gray-400 rounded-lg px-2 py-1 text-center text-pretty text-sm inline-block">
          <MdOutlineDraw className=" ml-9" />
          New design file
        </button>
        <button className="hover:bg-blue-500 border-2 border-gray-400 rounded-lg px-2 py-1 text-center text-pretty text-sm inline-block">
          <FaClipboard className=" ml-9" />
          New Fig board
        </button>
        <button className="hover:bg-pink-500 border-2 border-gray-400 rounded-lg px-2 py-1 text-center text-pretty text-sm inline-block">
          <PiSlideshowLight className=" ml-9" />
          New Slide deck
        </button>
        <button className="hover:bg-gray-500 border-2 border-gray-400 rounded-lg px-2 py-1 text-center text-pretty text-sm inline-block">
          <LuImport className=" ml-2" />
          Import
        </button>
      </div>

      <div className="flex-grow p-6 bg-gray-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Card 
            key={card.id}
            title={card.title}
            image={card.image}
            description={card.description}
            edited={card.edited}
          />
        ))}
      </div>
    </div>
  );
}

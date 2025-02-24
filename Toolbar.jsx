import React from 'react';
import { FaArrowRight, FaTh, FaSquare, FaPen, FaFont, FaCircle, FaLayerGroup, FaCode } from 'react-icons/fa';

const Toolbar = ({ setSelectedTool, onGridToggle, onExportCode, onLayersToggle }) => {
  const handleButtonClick = (tool) => {
    setSelectedTool(tool);
    if (tool === 'grid') {
      onGridToggle();
    } else if (tool === 'code') {
      onExportCode();
    } else if (tool === 'layers') {
      onLayersToggle();
    }
  };

  return (
    <div className="flex space-x-4 p-4 bg-gray-100 border-b border-gray-300">
      <button onClick={() => handleButtonClick('arrow')} className="p-2 transition-transform duration-200 transform hover:-translate-y-1 hover:shadow-lg">
        <FaArrowRight className="text-blue-500" />
      </button>
      <button onClick={() => handleButtonClick('grid')} className="p-2 transition-transform duration-200 transform hover:-translate-y-1 hover:shadow-lg">
        <FaTh />
      </button>
      <button onClick={() => handleButtonClick('square')} className="p-2 transition-transform duration-200 transform hover:-translate-y-1 hover:shadow-lg">
        <FaSquare />
      </button>
      <button onClick={() => handleButtonClick('pen')} className="p-2 transition-transform duration-200 transform hover:-translate-y-1 hover:shadow-lg">
        <FaPen />
      </button>
      <button onClick={() => handleButtonClick('text')} className="p-2 transition-transform duration-200 transform hover:-translate-y-1 hover:shadow-lg">
        <FaFont />
      </button>
      <button onClick={() => handleButtonClick('circle')} className="p-2 transition-transform duration-200 transform hover:-translate-y-1 hover:shadow-lg">
        <FaCircle />
      </button>
      <button onClick={() => handleButtonClick('layers')} className="p-2 transition-transform duration-200 transform hover:-translate-y-1 hover:shadow-lg">
        <FaLayerGroup />
      </button>
      <button onClick={() => handleButtonClick('code')} className="p-2 transition-transform duration-200 transform hover:-translate-y-1 hover:shadow-lg">
        <FaCode />
      </button>
    </div>
  );
};

export default Toolbar;
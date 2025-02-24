import React, { useState } from 'react';

const RightSideBar = ({ position, onPositionChange, onFillChange, onStrokeChange }) => {
  const [fill, setFill] = useState('#D9D9D9');
  const [stroke, setStroke] = useState('#000000');

  const handleFillChange = (e) => {
    const value = e.target.value;
    setFill(value);
    if (onFillChange) onFillChange(value);
  };

  const handleStrokeChange = (e) => {
    const value = e.target.value;
    setStroke(value);
    if (onStrokeChange) onStrokeChange(value);
  };

  const handlePositionChange = (e, axis) => {
    const value = parseInt(e.target.value, 10);
    if (onPositionChange) onPositionChange(axis, value);
  };

  return (
    <div className="w-64 h-full bg-white border-l border-gray-300 p-4 space-y-4">
      <div className="space-y-2">
        <h2 className="text-xl font-bold">Position</h2>
        <div className="flex space-x-2">
          <input type="number" value={position.x} onChange={(e) => handlePositionChange(e, 'x')} placeholder="X" className="w-1/2 p-2 border rounded" />
          <input type="number" value={position.y} onChange={(e) => handlePositionChange(e, 'y')} placeholder="Y" className="w-1/2 p-2 border rounded" />
        </div>
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-bold">Fill</h2>
        <input type="color" value={fill} onChange={handleFillChange} className="w-full p-2 border rounded" />
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-bold">Stroke</h2>
        <input type="color" value={stroke} onChange={handleStrokeChange} className="w-full p-2 border rounded" />
      </div>
    </div>
  );
};

export default RightSideBar;
import React, { useState, useEffect } from 'react';
import { LuFigma } from 'react-icons/lu';
import { BsFullscreenExit } from 'react-icons/bs';
import { AiOutlineFullscreen } from 'react-icons/ai';

const LeftSideBar = ({ layers, onSelect, onDelete, onMove }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleToggle = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  return (
    <section className="w-64 bg-gray-300 text-black h-full">
      <LuFigma className="text-4xl m-4" />
      <button
        onClick={handleToggle}
        aria-label={isFullScreen ? 'Exit Full Screen' : 'Enter Full Screen'}
      >
        {isFullScreen ? (
          <BsFullscreenExit className="text-2xl m-4" />
        ) : (
          <AiOutlineFullscreen className="text-2xl m-4" />
        )}
      </button>
      <div className="mt-4">
        {layers.map((layer, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 bg-white border-b cursor-pointer"
            onClick={() => onSelect(index)}
          >
            <span>Layer {index + 1}</span>
            <div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onMove(index);
                }}
                className="mx-1 text-green-500"
              >
                Move
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(index);
                }}
                className="mx-1 text-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LeftSideBar;
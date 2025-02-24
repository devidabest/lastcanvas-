import React, { useEffect, useRef, useState } from 'react';
import LeftSideBar from './LeftSideBar';
import RightSideBar from './RightSideBar';
import Toolbar from './Toolbar';

export default function SecondPage() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [selectedTool, setSelectedTool] = useState('pen');
  const [layers, setLayers] = useState([]);
  const [text, setText] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [textPos, setTextPos] = useState({ x: 0, y: 0 });
  const [inputScreenPos, setInputScreenPos] = useState({ x: 0, y: 0 });
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentShape, setCurrentShape] = useState(null);
  const [movingLayer, setMovingLayer] = useState(null);
  const [isMoving, setIsMoving] = useState(false);
  const [fillColor, setFillColor] = useState('#D9D9D9');
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showGrid, setShowGrid] = useState(false);
  const [showLayersPanel, setShowLayersPanel] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 500;
    canvas.height = 500;
    const context = canvas.getContext('2d');
    context.lineCap = 'round';
    context.lineWidth = 5;
    contextRef.current = context;
  }, []);

  useEffect(() => {
    redraw();
  }, [layers, showGrid]);

  const getCanvasMousePosition = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const handleMouseDown = (e) => {
    const { x, y } = getCanvasMousePosition(e);
    const screenX = e.clientX;
    const screenY = e.clientY;

    if (isMoving && movingLayer !== null) {
      const layer = layers[movingLayer];
      const offsetX = x - (layer.startPos?.x || layer.textPos?.x || 0);
      const offsetY = y - (layer.startPos?.y || layer.textPos?.y || 0);
      setDragOffset({ x: offsetX, y: offsetY });
      setIsMoving(true);
    } else if (selectedTool === 'pen') {
      contextRef.current.beginPath();
      contextRef.current.moveTo(x, y);
      setCurrentShape({
        tool: 'pen',
        path: [{ x, y }],
        strokeStyle: strokeColor,
        fillStyle: fillColor,
      });
      setIsDrawing(true);
    } else if (selectedTool === 'text') {
      setTextPos({ x, y });
      setInputScreenPos({ x: screenX, y: screenY });
      setShowInput(true);
    } else if (selectedTool === 'square' || selectedTool === 'circle' || selectedTool === 'arrow') {
      setStartPos({ x, y });
      setCurrentShape({
        tool: selectedTool,
        startPos: { x, y },
        width: 0,
        height: 0,
        strokeStyle: strokeColor,
        fillStyle: fillColor,
      });
      setIsDrawing(true);
    }
  };

  const handleMouseMove = (e) => {
    const { x, y } = getCanvasMousePosition(e);

    if (isMoving && movingLayer !== null) {
      const newX = x - dragOffset.x;
      const newY = y - dragOffset.y;

      const updatedLayers = layers.map((layer, index) => {
        if (index === movingLayer) {
          if (layer.tool === 'pen') {
            const deltaX = newX - (layer.startPos?.x || layer.path[0].x);
            const deltaY = newY - (layer.startPos?.y || layer.path[0].y);
            return {
              ...layer,
              path: layer.path.map(point => ({
                x: point.x + deltaX,
                y: point.y + deltaY
              })),
              startPos: { x: newX, y: newY }
            };
          } else if (layer.tool === 'text') {
            return {
              ...layer,
              textPos: { x: newX, y: newY }
            };
          } else {
            return { ...layer, startPos: { x: newX, y: newY } };
          }
        }
        return layer;
      });

      setLayers(updatedLayers);
      setPosition({ x: newX, y: newY });
      redraw();
    } else if (isDrawing) {
      if (selectedTool === 'pen') {
        contextRef.current.lineTo(x, y);
        contextRef.current.stroke();
        setCurrentShape(prev => ({
          ...prev,
          path: [...prev.path, { x, y }]
        }));
      } else if (selectedTool === 'square' || selectedTool === 'circle' || selectedTool === 'arrow') {
        const width = x - startPos.x;
        const height = y - startPos.y;
        setCurrentShape(prev => ({
          ...prev,
          width,
          height
        }));
        redraw();
        drawTemporaryShape(x, y);
      }
    }
  };

  const handleMouseUp = () => {
    if (isMoving) {
      setIsMoving(false);
      setDragOffset({ x: 0, y: 0 });
    } else if (isDrawing) {
      if (currentShape) {
        setLayers([...layers, currentShape]);
        setCurrentShape(null);
      }
      setIsDrawing(false);
    }
  };

  const drawTemporaryShape = (x, y) => {
    const context = contextRef.current;
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    redraw();
    
    context.strokeStyle = strokeColor;
    context.fillStyle = fillColor;
    
    if (selectedTool === 'square') {
      context.strokeRect(startPos.x, startPos.y, x - startPos.x, y - startPos.y);
    } else if (selectedTool === 'circle') {
      const radius = Math.sqrt(
        Math.pow(x - startPos.x, 2) + Math.pow(y - startPos.y, 2)
      ) / 2;
      context.beginPath();
      context.arc(
        startPos.x + (x - startPos.x)/2,
        startPos.y + (y - startPos.y)/2,
        radius,
        0,
        2 * Math.PI
      );
      context.stroke();
    } else if (selectedTool === 'arrow') {
      drawArrow(startPos.x, startPos.y, x, y);
    }
  };

  const drawArrow = (x1, y1, x2, y2) => {
    const context = contextRef.current;
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();

    const angle = Math.atan2(y2 - y1, x2 - x1);
    context.beginPath();
    context.moveTo(x2, y2);
    context.lineTo(
      x2 - 10 * Math.cos(angle - Math.PI/6),
      y2 - 10 * Math.sin(angle - Math.PI/6)
    );
    context.lineTo(
      x2 - 10 * Math.cos(angle + Math.PI/6),
      y2 - 10 * Math.sin(angle + Math.PI/6)
    );
    context.closePath();
    context.fill();
  };

  const redraw = () => {
    const context = contextRef.current;
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    
    if (showGrid) drawGrid();
    
    layers.forEach(layer => {
      context.strokeStyle = layer.strokeStyle || '#000000';
      context.fillStyle = layer.fillStyle || '#000000';
      
      if (layer.tool === 'pen') {
        context.beginPath();
        context.moveTo(layer.path[0].x, layer.path[0].y);
        layer.path.forEach(point => context.lineTo(point.x, point.y));
        context.stroke();
      } else if (layer.tool === 'square') {
        context.strokeRect(layer.startPos.x, layer.startPos.y, layer.width, layer.height);
        context.fillRect(layer.startPos.x, layer.startPos.y, layer.width, layer.height);
      } else if (layer.tool === 'circle') {
        context.beginPath();
        context.arc(
          layer.startPos.x + layer.width/2,
          layer.startPos.y + layer.height/2,
          Math.sqrt(layer.width**2 + layer.height**2)/2,
          0,
          2 * Math.PI
        );
        context.stroke();
        context.fill();
      } else if (layer.tool === 'arrow') {
        drawArrow(
          layer.startPos.x,
          layer.startPos.y,
          layer.startPos.x + layer.width,
          layer.startPos.y + layer.height
        );
      } else if (layer.tool === 'text') {
        context.font = `${layer.fontSize}px sans-serif`;
        context.fillText(layer.text, layer.textPos.x, layer.textPos.y);
      }
    });

    if (currentShape) {
      context.strokeStyle = currentShape.strokeStyle;
      context.fillStyle = currentShape.fillStyle;
      // Draw temporary shape while creating
    }
  };

  const drawGrid = () => {
    const context = contextRef.current;
    context.strokeStyle = '#ccc';
    context.lineWidth = 0.5;
    const step = 20;

    for (let x = 0; x <= context.canvas.width; x += step) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, context.canvas.height);
      context.stroke();
    }

    for (let y = 0; y <= context.canvas.height; y += step) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(context.canvas.width, y);
      context.stroke();
    }
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === '') return;

    setLayers([...layers, {
      tool: 'text',
      text,
      textPos,
      fillStyle: fillColor,
      fontSize: fontSize,
    }]);
    setText('');
    setShowInput(false);
    redraw();
  };

  const handleLayerSelect = (index) => {
    const layer = layers[index];
    setPosition(layer.startPos || layer.textPos || { x: 0, y: 0 });
  };

  const handleLayerDelete = (index) => {
    const updatedLayers = layers.filter((_, i) => i !== index);
    setLayers(updatedLayers);
    redraw();
  };

  const handleLayerMove = (index) => {
    const layer = layers[index];
    setMovingLayer(index);
    setPosition(layer.startPos || layer.textPos || { x: 0, y: 0 });
    setIsMoving(true);
  };

  const handlePositionChange = (axis, value) => {
    setPosition(prev => ({ ...prev, [axis]: value }));
    const updatedLayers = layers.map((layer, index) => 
      index === movingLayer ? { 
        ...layer, 
        startPos: { ...layer.startPos, [axis]: value } 
      } : layer
    );
    setLayers(updatedLayers);
    redraw();
  };

  return (
    <div className="flex h-screen">
      {showLayersPanel && (
        <LeftSideBar
          layers={layers}
          onSelect={handleLayerSelect}
          onDelete={handleLayerDelete}
          onMove={handleLayerMove}
        />
      )}
      <div className="flex flex-grow flex-col items-center justify-center relative">
        <Toolbar
          setSelectedTool={setSelectedTool}
          onGridToggle={() => setShowGrid(!showGrid)}
          onExportCode={() => {
            const canvas = canvasRef.current;
            const link = document.createElement('a');
            link.download = 'canvas.png';
            link.href = canvas.toDataURL();
            link.click();
          }}
          onLayersToggle={() => setShowLayersPanel(!showLayersPanel)}
        />
        <canvas
          ref={canvasRef}
          width="500"
          height="500"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          className="border-2 border-gray-500 mt-2"
        />
        {showInput && (
          <form
            onSubmit={handleTextSubmit}
            style={{
              position: 'fixed',
              left: inputScreenPos.x + 'px',
              top: inputScreenPos.y + 'px',
              background: 'white',
              transform: 'translate(-50%, -50%)',
              padding: '4px',
              border: '1px solid black',
              borderRadius: '4px',
              zIndex: 1000,
            }}
          >
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onBlur={handleTextSubmit}
              autoFocus
              style={{ 
                border: 'none', 
                outline: 'none',
                fontSize: `${fontSize}px`,
                color: fillColor 
              }}
            />
          </form>
        )}
      </div>
      <RightSideBar
        position={position}
        onPositionChange={handlePositionChange}
        onFillChange={setFillColor}
        onStrokeChange={setStrokeColor}
        fontSize={fontSize}
        onFontSizeChange={setFontSize}
      />
    </div>
  );
}
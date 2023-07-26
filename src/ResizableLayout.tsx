import React, { useState } from 'react';
import './ResizableLayout.css'; // Create a CSS file for styling

const ResizableLayout: React.FC = () => {
  const [columnWidths, setColumnWidths] = useState<number[]>([200, 200, 200]);
  const [resizingIndex, setResizingIndex] = useState<number | null>(null);
  const [initialX, setInitialX] = useState<number>(0);

  const handleMouseDown = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
    console.log('handleMouseDown');
    setResizingIndex(index);
    setInitialX(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    console.log('handleMouseMove');
    if (resizingIndex !== null) {
      const offset = e.clientX - initialX;
      setColumnWidths(prevWidths => {
        const newWidths = [...prevWidths];
        newWidths[resizingIndex] += offset;
        if (newWidths[resizingIndex] < 100) {
          newWidths[resizingIndex] = 100; // Minimum width to prevent collapsing
        }
        return newWidths;
      });
      setInitialX(e.clientX);
    }
  };

  const handleMouseUp = () => {
    console.log('handleMouseUp');
    setResizingIndex(null);
  };

  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, resizingIndex]);

  return (
    <div className="resizable-layout">
      <div className="column" style={{ width: columnWidths[0] }}>
        Column 1
        <div
          className="resize-handle"
          onMouseDown={(e) => handleMouseDown(0, e)}
        />
      </div>
      <div className="column" style={{ width: columnWidths[1] }}>
        Column 2
        <div
          className="resize-handle"
          onMouseDown={(e) => handleMouseDown(1, e)}
        />
      </div>
      <div className="column" style={{ width: columnWidths[2] }}>
        Column 3
      </div>
    </div>
  );
};

export default ResizableLayout;

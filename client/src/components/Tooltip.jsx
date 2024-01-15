// Tooltip.js
import React from 'react';

const Tooltip = ({ text, children }) => {
  return (
    <div className="relative group">
      {children}
      <div className="hidden group-hover:block absolute z-10 p-2 bg-black text-white rounded-md text-sm">
        {text}
      </div>
    </div>
  );
};

export default Tooltip;

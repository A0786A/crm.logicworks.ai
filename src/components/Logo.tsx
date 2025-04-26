import React, { useState } from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = 'h-12 w-auto' }) => {
  const [error, setError] = useState(false);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error('Error loading logo:', e);
    setError(true);
  };

  if (error) {
    return (
      <div className={`${className} flex items-center justify-center bg-gray-100 rounded-lg`}>
        <span className="text-gray-500">Logo</span>
      </div>
    );
  }

  return (
    <img 
      src="/Logic_Works_Logo.png" 
      alt="LogicWorks.AI Logo"
      className={className}
      onError={handleError}
    />
  );
};

export default Logo;
import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = 'h-12 w-auto' }) => {
  return (
    <img 
      src="/Logic_Works_Logo.png" 
      alt="LogicWorks.AI Logo"
      className={className}
    />
  );
};

export default Logo;
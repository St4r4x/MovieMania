"use client"
import React, { useState } from 'react';

interface ActionButtonProps {
  icon: string; 
  onClick?: () => void; 
  ariaLabel?: string; 
}


interface ActionButtonProps {
  icon: string;
  onClick?: () => void; 
  ariaLabel?: string; 
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, onClick = () => {}, ariaLabel = '' }) => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active); // Bascule l'état à chaque clic
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      aria-label={ariaLabel}
      className="w-14 h-14 border-2 border-white rounded-full flex items-center justify-center transition"
    >
      <i className={`fas ${icon} ${active ? 'text-white' : 'text-gray-500'} text-xl`}></i>
    </button>
  );
};

export default ActionButton;


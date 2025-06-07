import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  onClick?: () => void;
}

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

/**
 * Card component that renders a styled card element
 * 
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - The content to display inside the card
 * @param {string} [props.className=''] - The class name to apply to the card
 * @param {string} [props.padding='md'] - The padding to apply to the card
 * @param {boolean} [props.hover=false] - Whether the card should have a hover effect
 * @param {Function} [props.onClick] - The function to call when the card is clicked
 */
export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  padding = 'md',
  hover = false,
  onClick,
}) => {
  return (
    <div 
      className={`
        bg-white 
        rounded-lg 
        shadow-lg
        ${paddingStyles[padding]}
        ${hover ? 'hover:shadow-xl transition-shadow duration-200' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
}; 
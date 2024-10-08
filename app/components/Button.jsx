import React from 'react';
import c from './Button.module.css';

export default function Button({
  onClick, 
  children, 
  className, 
  type = 'button',
  size = 'default',
  color = 'primary',
  disabled
}) {

  const colorClass = color === 'red' ? c.delete : color === 'primary' ? c.btn : '';
  // const sizeClass = size === 'small' ? c.small : size === 'large' ? c.large : '';

  const sizeClass = {
    small: c.small,
    medium: c.medium,
    large: c.large,
    default: c.default
  }[size];


  return (
    <button 
      disabled={disabled} 
      className={`
        ${c.btn} 
        ${colorClass} 
        ${sizeClass}
        ${className}
        `} 
      onClick={onClick}
      type={type}
     >{children}
    </button>
  )
}

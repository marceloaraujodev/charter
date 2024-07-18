import React from 'react';
import c from './Button.module.css';

export default function Button({onClick, children, className, type = 'button'}) {
  return (
    <button 
      className={`${c.btn} ${className}`} 
      onClick={onClick}
      type={type}
     >{children}
    </button>
  )
}

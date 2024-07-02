import React from 'react';
import c from './Button.module.css';

export default function Button({onClick, children, classname}) {
  return (
    <button className={`${c.btn} ${classname}`} onClick={onClick}>{children}</button>
  )
}

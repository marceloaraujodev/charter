import React from 'react';
import c from './Button.module.css';

export default function Button({onclick, children, classname}) {
  return (
    <button className={`${c.btn} ${classname}`} onClick={onclick}>{children}</button>
  )
}

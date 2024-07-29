import React from 'react';
import Login from '../../components/Login';
import PageContent from '@/app/components/PageContent';
import c from './page.module.css'
export default function loginPage() {
  return (
    <div className={c.container}>
      <Login />

    </div>
  );
}

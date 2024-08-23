'use client'
import { createContext, useState, useContext } from "react";
import { signOut, useSession } from 'next-auth/react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const { data: session } = useSession();
  const [resetCheckList, setResetCheckList] = useState(false);
  const [listTileIsVisible, setListTileIsVisible] = useState(true);
  const [displayList, setDisplayList] = useState(false);
  const [role, setRole] = useState(session?.user?.role);
  const [serviceData, setServiceData] = useState([]);
  

  const value = {
    resetCheckList, 
    setResetCheckList,
    listTileIsVisible, 
    setListTileIsVisible,
    displayList, 
    setDisplayList,
    role, 
    setRole,
    serviceData, 
    setServiceData
  }

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext);
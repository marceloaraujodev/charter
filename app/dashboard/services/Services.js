import { useState, useEffect } from 'react';
import c from './Services.module.css';
import HorizontalCharts from '../Graphics/Horizontal/HorizontalCharts';
import { useGlobalContext } from '@/app/GlobalContext';
import ServiceTable from '../ServiceTable/ServiceTable'

export default function Services() {
 const [isUpdated, setIsUpdated] = useState(false);

  return (
    <div>
      <HorizontalCharts isUpdated={isUpdated} />
      <div className={c.tableCont}>
        <ServiceTable  setIsUpdated={setIsUpdated} isUpdated={isUpdated} />
      </div>
    </div>
  );
}

import { useEffect } from 'react';
import c from './PageContent.module.css';
export default function PageContent({children}) {
  // Scroll to top on view change
  useEffect(() => {
  window.scrollTo(0, 0);
}, [children]);

    
  return (
    <>
      <div className={c.container}>
        <div className={c.wrapper}>
          {children}
        </div>
      </div>
    </>
  );
}

import c from './PageContent.module.css';
export default function PageContent({children}) {
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

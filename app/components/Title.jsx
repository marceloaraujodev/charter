import c from './Title.module.css';
export default function Title({title, colorClass}) {
  return (
    <div>
      <h2 className={`${c.container} ${c[colorClass]}`} >
        <span className={c.title}>
          {title}
        </span>
      </h2>
    </div>
  );
}
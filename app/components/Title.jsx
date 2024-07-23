import c from './Title.module.css';
export default function Title({title, colorClass, center = false}) {
  return (
    <div>
      <h2 className={`${c.container} ${c[colorClass]}`} >
        <span className={`${c.title} ${center ? c.center : ''}`}>
          {title}
        </span>
      </h2>
    </div>
  );
}
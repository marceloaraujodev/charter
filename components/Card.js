import Image from 'next/image';
import c from './Card.module.css';

export default function Card({ title, description, image }) {
  return (
    <div className={` ${c.animation}`}>
      <Image src={image} 
        className={c.img}
        width='auto'
        height='auto'
      />
      <div className={c.cardBody}>
        <h5 className={c.cardTitle}>{title}</h5>
        <p className={c.cardText}>{description}</p>
        <a href="#" className={`btn btn-primary ${c.btnCard}`}>
          Go somewhere
        </a>
      </div>
    </div>
  );
}

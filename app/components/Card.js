import Image from 'next/image';
import Button from './Button';
import c from './Card.module.css';

export default function Card({ title, description, image }) {
  return (
    <div className={` ${c.animation}`}>
      <Image
        src={image}
        className={c.img}
        width="auto"
        height="auto"
        alt="cardImg"
      />
      <div className={c.cardBody}>
        <h5 className={c.cardTitle}>{title}</h5>
        <div className={c.textCont}>
        <p className={c.cardText}>{description}</p>
        </div>
        {/* <a href="#" className={`btn btn-primary ${c.btnCard}`}>
          Book Now
        </a> */}
        <Button>Book now</Button>
      </div>
    </div>
  );
}

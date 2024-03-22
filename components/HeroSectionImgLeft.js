import c from './HeroSectionImgLeft.module.css';
import Image from 'next/image';


export default function HeroSectionImgLeft({title, description, image}) {
  return (
    <div className={c.container}>
      <div className={c.contentContainer}>
        <div className={c.heroRow}>
          <div className={c.left}>
            <Image
            className={c.img}
              src={image}
              alt="Hero Section Image"
              width={500}
              height={300}
            />
          </div>
          <div className={c.right}>
            <div className={c.title}>{title}</div>
            <div className={c.description}>
              {description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

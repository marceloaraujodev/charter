import c from './HeroSectionImgRight.module.css';
import Image from 'next/image';


export default function HeroSectionImgRight({title, description, image}) {
  return (
    <div className={c.container}>
    <div className={c.contentContainer}>
      <div className={c.heroRow}>
        <div className={c.left}>
          <div className={c.title}>{title}</div>
          <div className={c.description}>
            {description}
          </div>
        </div>

        <div className={c.right}>
          <Image
          className={c.img}
            src={image}
            alt="Hero Section Image"
            width={500}
            height={300}
          />
        </div>
      </div>
    </div>
    </div>
  );
}

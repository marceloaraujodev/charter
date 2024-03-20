import c from './HeroSectionImgLeft.module.css';
import Image from 'next/image';
import f from '../public/images/yacht-82.JPG';

export default function HeroSectionImgLeft() {
  return (
    <div className={c.container}>
      <div className={c.contentContainer}>
        <div className={c.heroRow}>
          <div className={c.left}>
            <Image
            className={c.img}
              src={f}
              alt="Hero Section Image"
              width={500}
              height={300}
            />
          </div>
          <div className={c.right}>
            <div className={c.title}>Luxurious Yacht Charter</div>
            <div className={c.description}>
              Indulge in the ultimate experience of luxury and relaxation with our
              Charter Yacht. Our yacht is equipped with top-notch amenities and a
              professional crew to cater to your every need.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

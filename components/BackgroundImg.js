import classes from './BackgroundImg.module.css';
import Image from 'next/image';
import boat from '../public/images/main.jpg'

export default function BackgroundImg() {
  return (
    <div className={classes.imageContainer}>
      <Image src={boat} layout="fill" objectFit="cover" objectPosition="center"  />
      {/* <Image src={boat} style={{objectFit: 'cover', objectPosition: 'center'}}  /> */}
    </div>
  )
}

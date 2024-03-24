import c from './BackgroundImg.module.css';

export default function BackgroundImg({className}) {

  return (
    
    <div className={`${c.imageContainer}  ${c[className]}`}>
    </div>
  )
}

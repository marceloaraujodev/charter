// import {useRouter} from 'next/router';
import Image from 'next/image';
import c from './page.module.css';
import nick from '../../public/images/crew/captain-nick.jpg';
import yandri from '../../public/images/crew/captain-yandri.jpg';
import james from '../../public/images/crew/captain-james.jpg';

export default function CrewPage() {

  return (
    <div className='container'>
      <section className={c.contentContainer}>
        <div className={c.photo}>
          <Image 
          src={nick} 
          width={150} 
          height={150} 
          alt={'captain'}
          className="rounded-circle shadow-1-strong object-fit-cover"/>
        </div>
        <div className={c.name}>Nick</div>
        <div className={c.profession}>Captain</div>
        <div className={c.descriptionContainer}>
          <p className="px-xl-3">
            <i className="fas fa-quote-left pe-2"></i>Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Quod eos id officiis hic tenetur
            quae quaerat ad velit ab hic tenetur.
          </p>
        </div>
      </section>
      <section className={c.contentContainer}>
        <div className={c.photo}>
          <Image 
          src={yandri} 
          width={150} 
          height={150} 
          alt={'captain'}
          className="rounded-circle shadow-1-strong object-fit-cover"/>
        </div>
        <div className={c.name}>Yandri</div>
        <div className={c.profession}>Captain</div>
        <div className={c.descriptionContainer}>
          <p className="px-xl-3">
            <i className="fas fa-quote-left pe-2"></i>Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Quod eos id officiis hic tenetur
            quae quaerat ad velit ab hic tenetur.
          </p>
        </div>
      </section>
      <section className={c.contentContainer}>
        <div className={c.photo}>
          <Image 
          src={james} 
          width={150} 
          height={150} 
          alt={'captain'}
          className="rounded-circle shadow-1-strong object-fit-cover"/>
        </div>
        <div className={c.name}>James</div>
        <div className={c.profession}>Captain</div>
        <div className={c.descriptionContainer}>
          <p className="px-xl-3">
            <i className="fas fa-quote-left pe-2"></i>Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Quod eos id officiis hic tenetur
            quae quaerat ad velit ab hic tenetur.
          </p>
        </div>
      </section>
    </div>
  )
}

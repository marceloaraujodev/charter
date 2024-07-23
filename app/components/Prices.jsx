import Button from './Button';
import { motion } from 'framer-motion';
import Calendar from './Calendar';
import Title from './Title';
import c from './Prices.module.css';
export default function Prices() {
  return (
    <div className={c.priceCont}>
      <div className={c.titleCont}>
        <Title title='Pricing and Availability' center={true} />
      </div>
      <div className={c.priceBoxes}>
        <div className={c.box}>4hrs</div>
        <div className={c.box}>6hrs</div>
        <div className={c.box}>8hrs</div>
      </div>

      <div className={c.priceInfo}>
        <p>Our Yacht can also be chartered from other ports. Contact us for pricing and bookings.</p>
      </div>
    </div>
  );
  {
    /* <h4>Available Charter Times 4 hrs, 6 hrs or 8 hrs Term Charters</h4>
  <p className="col-lg-6 mx-auto mb-4">
    Our Yacht can also be chartered from other ports. Contact your
    Broker for pricing and bookings.
  </p> */
  }
}

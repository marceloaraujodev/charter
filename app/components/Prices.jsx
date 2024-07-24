import { useState } from 'react';
import Button from './Button';
import { motion } from 'framer-motion';
import Calendar from './Calendar';
import Title from './Title';
import c from './Prices.module.css';
import { set } from 'mongoose';
export default function Prices() {
  const [showInfo, setShowInfo] = useState(false);
  const [amount, setAmount] = useState();
  const [selectedTime, setSelectedTime] = useState(null);

  const handleClick = (time) => {
    if (time === selectedTime) {
      // If the same box is clicked, toggle the showInfo state
      setShowInfo(!showInfo);
    } else {
      // If a different box is clicked, set the amount and ensure showInfo is true
      setShowInfo(true);
      setSelectedTime(time);
      setAmount(time);
    }
  };

  return (
    <div className={c.priceCont}>
      <div className={c.titleCont}>
        <Title title="Pricing and Availability" center={true} />
      </div>
      <div className={c.dividerCont}>
        <div class={c.arrowDivider}>
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M1200 0L0 0 598.97 114.72 1200 0z"
              className={c.shapeFill}
            ></path>
          </svg>
        </div>
      </div>

      <div className={c.priceCardsCont}>
        <div className={c.priceCards}>
          <div className={`card rounded-3 shadow-sm ${c.width}`}>
            <div className="card-header py-3">
              <h4 className="my-0 fw-normal">4 hours</h4>
            </div>
            <div className="card-body">
              <h1 className="card-title pricing-card-title">
                $4000<small className="text-body-secondary fw-light"></small>
              </h1>
              <ul className="list-unstyled mt-3 mb-4">
                <li>10 guests</li>
                <li>80 feet</li>
                <li>jacuzzi</li>
                <li>stew</li>
              </ul>
              <Button size="large">Book Now</Button>
            </div>
          </div>

          <div className="card rounded-3 shadow-sm">
            <div className={`card-header py-3 ${c.headerBackground}`}>
              <h4 className="my-0 fw-normal">6 hours</h4>
            </div>
            <div className="card-body">
              <h1 className="card-title pricing-card-title">
                $6000<small className="text-body-secondary fw-light"></small>
              </h1>
              <ul className="list-unstyled mt-3 mb-4">
                <li>10 guests</li>
                <li>80 feet</li>
                <li>jacuzzi</li>
                <li>stew</li>
              </ul>
              <Button size="large">Book Now</Button>
            </div>
          </div>

          <div className="card rounded-3 shadow-sm">
            <div className="card-header py-3 ">
              <h4 className="my-0 fw-normal">8 hours</h4>
            </div>
            <div className="card-body">
              <h1 className="card-title pricing-card-title">
                $8000<small className="text-body-secondary fw-light"></small>
              </h1>
              <ul className="list-unstyled mt-3 mb-4">
                <li>10 guests</li>
                <li>80 feet</li>
                <li>jacuzzi</li>
                <li>stew</li>
              </ul>
              <Button size="large">Book Now</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

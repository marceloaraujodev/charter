'use client';
import Calendar from '@/app/components/Calendar';
import { motion } from 'framer-motion';
import c from './page.module.css';

export default function Pricing() {
  return (
    <div className="container">
      <div className={c.containerOuter}>
        <div className="container my-5">
          <div className="position-relative p-5 text-center text-muted bg-body border border-dashed rounded-5">
            <h1>Pricing and Availability</h1>
            <h4>Available Charter Times 4 hrs, 6 hrs or 8 hrs Term Charters</h4>
            <p className="col-lg-6 mx-auto mb-4">
              Our Yacht can also be chartered from other ports. Contact your
              Broker for pricing and bookings.
            </p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`btn btn-primary px-5 mb-5 ${c.btnPricing}`}
              type="button"
            >
              Book now!
            </motion.button>
          </div>
        </div>
        <div className={c.calendarContainer}>
          <Calendar />
        </div>
      </div>
    </div>
  );
}

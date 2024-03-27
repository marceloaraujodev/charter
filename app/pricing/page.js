import c from './page.module.css';

export default function Pricing() {
  return (
    <div className={c.container}>
      <div className={c.contentContainer}>
        <h1>Pricing</h1>
        <div className={c.title}>
          <h2>
            Available Charter Times 4 Hours - 6 Hours - 8 Hours - Term Charters
            <br />
            <span>
              Our Yacht can also be chartered from other ports. Contact your
              Broker for pricing and bookings.
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
}

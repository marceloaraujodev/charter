import PageContent from '../components/PageContent';
import Wave from '../components/Wave';
import Title from '../components/Title';
import c from './page.module.css';

export default function features() {
  return (
    <PageContent>
        <Title title='Features' center={true}/>
        <Wave position="bottom" />
      <div className={c.contentContainer}>
        <div className={c.featuresColumn}>
          <h3>WaterToys </h3>
          <p>15ft Walker Bay Venture tender with a 75hp 2 stroke motor</p>
          <p>Water skis, tube</p>
          <p>Jet skis -available for $175/hr.</p>
          <p>Inflatable Kayak, Fishing poles and gear</p>
          <p>Snorkels, fins and masks</p>
          <p>6x18 floating water pad</p>
          <p>11ft inflatable paddleboard and Noodles</p>
        </div>

        <div className={c.featuresColumn}>
          <h3>Special Features</h3>
          <p>Jacuzzi & full wet bar on flybridge</p>
          <p>
            Large updated country kitchen with center island, perfect for
            catering or any type of meal prep
          </p>
          <p>Hydraulic swim platform</p>
          <p>Multiple custom sun pads</p>
          <p>Multiple refrigerators and ice makers</p>
          <p>
            Upgraded bluetooth stereo with multiple amplifiers, multiple control
            heads and JL speakers
          </p>
          <p>Satellite TV and Pepwave Internet</p>
          <p>Two Onan 20k generators</p>
        </div>

        <div className={c.featuresColumn}>
          <h3>Accommodations</h3>
          <p>6 Heads, 5 staterooms</p>
          <p>
            1 Master-king bed with en-suite shower/jacuzzi tub with double sink
            vanity
          </p>
          <p>2 VIP&#x2019;s Staterooms- Queens-with en suite bathrooms</p>
          <p>1 Full Size-with en suite bathroom</p>
          <p>1 Crew - Twin over and under-with en suite bathroom</p>
          <p>Day head</p>
          <p>
            Two sets of clothes washers and dryers. One set in the front of the
            boat for crew use, and one set in the back of the boat to service
            the 3 quest staterooms
          </p>
        </div>

        <div className={c.featuresColumn}>
          <h3>General Info</h3>
          <p>Beam: 20' 1'', Draft: 5'</p>
          <p>
            Length 80 ft. Overall length with hydraulic TNT platform 85 feet
          </p>
          <p>Displacement: 115,000 lb</p>
          <p>
            Fuel Tank: 1 x 2000 gallon Fresh Water: 1 x 400 gallon Black water:
            1 x 200 gallon
          </p>
          <p>Caterpillar C-30s, 1550hp motors</p>
          <p>Max speed 30 knots, cruise speed 23-24 knots</p>
          <p>Bow Thruster, Stabilizers</p>
          <p>Water-maker-1200 gallons/day</p>
        </div>
      </div>
    </PageContent>
  );
}

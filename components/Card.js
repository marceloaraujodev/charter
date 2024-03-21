import classes from './Card.module.css';

export default function Card({ title, description, image }) {
  return (
    <div className={`card ${classes.animation}`}>
      {image}
      <div className={classes.cardBody}>
        <h5 className={classes.cardTitle}>{title}</h5>
        <p className={classes.cardText}>{description}</p>
        <a href="#" className={`btn btn-primary ${classes.btnCard}`}>
          Go somewhere
        </a>
      </div>
    </div>
  );
}

import classes from './Nav.module.css';

export default function Nav() {
  return (
    <nav className={classes.nav}>
      <div className={classes.logoContainer}>
      <p className={classes.logo}>LOGO</p>
      </div>
      <ul>
        <li>HOME</li>
        <li>FEATURES</li>
        <li>GALLERY</li>
        <li>REVIEWS</li>
        <li>MEET THE CREW</li>
        <li>PRICING & AVAILABILITY</li>
      </ul>
    </nav>
  )
}

import React from 'react';
import c from './Reviews.module.css';

export default function Reviews() {
  return (
    <div className={c.container}>

      <section className={c.contentContainer}>
        <div className={c.photo}>
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp"
            className="rounded-circle shadow-1-strong"
            width="150"
            height="150"
          />
        </div>
        <div className={c.name}>Maria Smantha</div>
        <div className={c.profession}>Web Developer</div>
        <div className={c.descriptionContainer}>
          <p className="px-xl-3">
            <i className="fas fa-quote-left pe-2"></i>Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Quod eos id officiis hic tenetur
            quae quaerat ad velit ab hic tenetur.
          </p>
        </div>

        <ul
          className={`list-unstyled mb-0 ${c.ratingContainer}`}
        >
          <li>
            <i className={`bi bi-star-fill ${c.star}`}></i>
          </li>
          <li>
            <i className={`bi bi-star-fill ${c.star}`}></i>
          </li>
          <li>
            <i className={`bi bi-star-fill ${c.star}`}></i>
          </li>
          <li>
            <i className={`bi bi-star-fill ${c.star}`}></i>
          </li>
          <li>
            <i className={`bi bi-star-fill ${c.star}`}></i>
          </li>
        </ul>
      </section>
      
      <section className={c.contentContainer}>
        <div className={c.photo}>
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp"
            className="rounded-circle shadow-1-strong"
            width="150"
            height="150"
          />
        </div>
        <div className={c.name}>Maria Smantha</div>
        <div className={c.profession}>Web Developer</div>
        <div className={c.descriptionContainer}>
          <p className="px-xl-3">
            <i className="fas fa-quote-left pe-2"></i>Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Quod eos id officiis hic tenetur
            quae quaerat ad velit ab hic tenetur.
          </p>
        </div>

        <ul
          className={`list-unstyled mb-0 ${c.ratingContainer}`}
        >
          <li>
            <i className={`bi bi-star-fill ${c.star}`}></i>
          </li>
          <li>
            <i className={`bi bi-star-fill ${c.star}`}></i>
          </li>
          <li>
            <i className={`bi bi-star-fill ${c.star}`}></i>
          </li>
          <li>
            <i className={`bi bi-star-fill ${c.star}`}></i>
          </li>
          <li>
            <i className={`bi bi-star-fill ${c.star}`}></i>
          </li>
        </ul>
      </section>
      
      <section className={c.contentContainer}>
        <div className={c.photo}>
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp"
            className="rounded-circle shadow-1-strong"
            width="150"
            height="150"
          />
        </div>
        <div className={c.name}>Maria Smantha</div>
        <div className={c.profession}>Web Developer</div>
        <div className={c.descriptionContainer}>
          <p className="px-xl-3">
            <i className="fas fa-quote-left pe-2"></i>Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Quod eos id officiis hic tenetur
            quae quaerat ad velit ab hic tenetur.
          </p>
        </div>

        <ul
          className={`list-unstyled mb-0 ${c.ratingContainer}`}
        >
          <li>
            <i className={`bi bi-star-fill ${c.star}`}></i>
          </li>
          <li>
            <i className={`bi bi-star-fill ${c.star}`}></i>
          </li>
          <li>
            <i className={`bi bi-star-fill ${c.star}`}></i>
          </li>
          <li>
            <i className={`bi bi-star-fill ${c.star}`}></i>
          </li>
          <li>
            <i className={`bi bi-star-fill ${c.star}`}></i>
          </li>
        </ul>
      </section>

    </div>
  );
}

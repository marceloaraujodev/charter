import React from 'react';
import classes from './Content.module.css';
import Card from './Card';
import Image from 'next/image';
import boat from '../public/images/2.jpg';


export default function Content() {
  return (
    <>
    <div className={classes.mainContainer}>
    <div className={classes.contentContainer}>
      <div className={classes.sectionContainer}>
        <section className={classes.section}>
          <Card 
          title={'Title'}
          description='BOOK YOUR CRUISE' 
          image={<Image src={boat} width={350} alt='boat'/>}
           /> 
        </section>
      </div>     
      {/* <div className={classes.sectionContainer}>
        <section className={classes.section}>
          <Card 
          title={'Title'}
          description='BOOK YOUR CRUISE' 
          image={<Image src={boat} width={350}/>}
           /> 
        </section>
      </div>      */}

    </div>
      {/* <div className={classes.contentContainer}>
        <div className={classes.sectionContainer}>
          <section className={classes.section}>
            <Card 
            title={'Title'}
            description='BOOK YOUR CRUISE' 
            image={<Image src={boat} width={350}/>}
            /> 
          </section>
        </div>     
        <div className={classes.sectionContainer}>
          <section className={classes.section}>
            <Card 
            title={'Title'}
            description='BOOK YOUR CRUISE' 
            image={<Image src={boat} width={350}/>}
            /> 
          </section>
        </div>     

      </div> */}
    </div>
    </>
  );
}

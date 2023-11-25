import React from 'react';
import styles from './styles.module.scss';
import { BiRightArrowAlt } from 'react-icons/bi';

const CircledIconBtn = ({ type, text, icon }) => {
   return (
      <button className={styles.button} type={type}>
         {text}
         <div className={styles.svg__wrap}>
            <BiRightArrowAlt/>
         </div>
      </button>
   )
};

export default CircledIconBtn;
import React from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';
import {MdSecurity} from 'react-icons/md';
import {BsSuitHeart} from 'react-icons/bs';
import {RiAccountPinCircleLine,RiArrowDropDownFill} from 'react-icons/ri';
import { useState } from 'react';
import UserMenu from './UserMenu';

const Top = ({country}) => {
   
   const [loggedIn, setLoggedIn] = useState(true);
   const [visible, setVisible] = useState(false);

   return (
      <div className={styles.top}>
         <div className={styles.top__container}>
            <div></div>
            <ul className={styles.top__list}>
               <li className={styles.li}>
                  <img
                     src={country.flag}
                     alt=''
                  />
                  <span>{country.name} S/.</span>
               </li>
               <li className={styles.li}>
                  <MdSecurity/>
                  <span>Buyer protection</span>
               </li>
               <li className={styles.li}>
                  <span>Customer Service</span>
               </li>
               <li className={styles.li}>
                  <span>Help</span>
               </li>
               <li className={styles.li}>
                  <BsSuitHeart/>
                  <Link href="/profile/whishlist">
                     <span>Whishlist</span>
                  </Link>
               </li>
               <li className={styles.li}
                  onMouseOver={()=>setVisible(true)}
                  onMouseLeave={()=>setVisible(false)}
               >
                  {loggedIn ? (
                        <li className={styles.li}>
                           <div className={styles.flex}>
                              <img src="https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png" alt="profile"/>
                              <span>Ernesto Alonso</span>
                              <RiArrowDropDownFill/>
                           </div>
                        </li>) : (
                        <li className={styles.li}>
                           <div className={styles.flex}>
                              <RiAccountPinCircleLine/>
                              <span>Account</span>
                              <RiArrowDropDownFill/>
                           </div>
                        </li>
                     )
                  }
                  {
                     visible && <UserMenu loggedIn={loggedIn}/>
                  }
               </li>
            </ul>
         </div>
      </div>
   )
};

export default Top;
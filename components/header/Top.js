import React from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';
import {MdSecurity} from 'react-icons/md';
import {BsSuitHeart} from 'react-icons/bs';
import {RiAccountPinCircleLine,RiArrowDropDownFill} from 'react-icons/ri';
import { useState } from 'react';
import UserMenu from './UserMenu';
import { useSession } from 'next-auth/react';

const Top = ({country}) => {
   
   const { data:session } = useSession();
   const [visible, setVisible] = useState(false);

   return (
      <div className={styles.top}>
         <div className={styles.top__container}>
            <div></div>
            <ul className={styles.top__list}>
               <li className={styles.li}>
                  {/* <img
                     src={country.flag}
                     alt=''
                  /> */}
                  {/* <span>{country.name} S/.</span> */}
                  <span>Peru S/.</span>
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
                  {session ? (
                        <li className={styles.li}>
                           <div className={styles.flex}>
                              <img src={session.user.image} alt="profile"/>
                              <span>{session.user.name}</span>
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
                     visible && <UserMenu session={session}/>
                  }
               </li>
            </ul>
         </div>
      </div>
   )
};

export default Top;
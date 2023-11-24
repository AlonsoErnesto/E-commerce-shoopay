import Link from 'next/link';
import  styles from './styles.module.scss';

const UserMenu = ({loggedIn}) => {
   return (
      <div className={styles.menu}>
         <h4>Welcome to Shoppay!</h4>
         {loggedIn ? 
               <div className={styles.flex}>
                  <img 
                     className={styles.menu__img} 
                     src="https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png" 
                     alt="profile"
                  />
                  <div className={styles.col}>
                     <span>Welcome Back</span>
                     <h3>Ernesto Alonso</h3>
                     <span>Sign out</span>
                  </div>
               </div>
            :  (
               <div className={styles.flex}>
                  <button className={styles.btn_primary}>Register</button>
                  <button className={styles.btn_outlined}>Login</button>
               </div>
            )
         }
         <ul>
            <li>
               <Link href="/profile">Account</Link>
            </li>
            <li>
               <Link href="/profile/orders">My Orders</Link>
            </li>
            <li>
               <Link href="/profile/messages">Message Center</Link>
            </li>
            <li>
               <Link href="/profile/address">Address</Link>
            </li>
            <li>
               <Link href="/profile/whishlist">Whishlist</Link>
            </li>
         </ul>
      </div>
   );
};

export default UserMenu;
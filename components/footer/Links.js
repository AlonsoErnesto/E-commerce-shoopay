import React from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';


const Links = () => {
   return (
      <div className={styles.footer__links}>
         {links.map((link,i) => (
            <ul key={i}>
               <b>{link.heading}</b>
               { i === 0 ? <img src="./logo.png" alt='logo'/> : (<b>{link.heading}</b>)}
               {
                  link.links.map((link,i) => (
                     <li key={i}>
                        <Link href={link.link}>{link.name}</Link>
                     </li>
                  ))
               }
            </ul>
         ))}
      </div>
   )
}

const links = [
   {  
      heading: "",
      links: [
      {
         name: "About us",
         link: "",
      },
      {
         name: "Contact us",
         link: "",
      },
      {
         name: "Social Responsibility",
         link: "",
      },
      {
         name: "",
         link: "",
      },
      ],
   },
   {
      heading: "HELP & SUPPORT",
      links: [
      {
         name: "Shipping Info",
         link: "",
      },
      {
         name: "Returns",
         link: "",
      },
      {
         name: "How To Order",
         link: "",
      },
      {
         name: "How To Track",
         link: "",
      },
      {
         name: "Size Guide",
         link: "",
      },
      ],
   },
   {
      heading: "Customer service",
      links: [
      {
         name: "Customer service",
         link: "",
      },
      {
         name: "Terms and Conditions",
         link: "",
      },
      {
         name: "Consumers (Transactions)",
         link: "",
      },
      {
         name: "Take our feedback survey",
         link: "",
      },
      ],
   },
];

export default Links;
import React from 'react';
import Link from 'next/link';
import {IoLocationSharp} from 'react-icons/io5'
import styles from './styles.module.scss';

const Copyright = ({country}) => {
  return (
    <div className={styles.footer__copyright}>
      <section>©2023 SHOPPAY All Rights Reserved.</section>
      <section>
        <ul>
          {data.map((link, i) => (
            <li key={i}>
              <Link href={link.link}>
                {link.name}
              </Link>
            </li>
          ))}
          <li>
            <Link href='/'>
              <IoLocationSharp/> {country.name}
            </Link>
          </li>
        </ul>
      </section>
    </div>
  )
}

const data = [
  {
    name: "Privacy Center",
    link: "",
  },
  {
    name: "Privacy & Cookie Policy",
    link: "",
  },
  {
    name: "Manage Cookies",
    link: "",
  },
  {
    name: "Terms & Conditions",
    link: "",
  },
  {
    name: "Copyright Notice",
    link: "",
  },
];


export default Copyright
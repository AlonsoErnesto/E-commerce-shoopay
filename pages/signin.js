import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';
import {BiLeftArrowAlt} from "react-icons/bi";
import styles from "../styles/signin.module.scss";
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import LoginInput from '@/components/inputs/loginInput';
import CircledIconBtn from '@/components/buttons/circledIconBtn';

const initialValues = {
   login_email : "",
   login_password:""
}
const Signin = () => {

   const [user, setUser] = useState(initialValues);
   const { login_email, login_password } = user;
   const handleChange = (e) => {
      const {name, value} = e.target;
      setUser({...user,[name]:value});
   };
   const loginValidation = Yup.object({
      login_email:Yup.string().required("Email address is required.").email('Please enter a valid email address.'),
      login_password:Yup.string().required("Password is required"),
   })

   return (
      <>
         <Header/>
            <div className={styles.login}>
               <div className={styles.login__container}>
                  <div className={styles.login__header}>
                     <div className={styles.back__svg}>
                        <BiLeftArrowAlt/>
                     </div>
                     <span>
                        We'd be happy yo join us! <Link href="/"> Go Store</Link>
                     </span>
                  </div>
                  <div className={styles.login__form}>
                     <h1>Sign In</h1>
                     <p>
                        Get access to one of the best Eshopping services in the world.
                     </p>
                     {/* Form */}
                     <Formik
                        enableReinitialize
                        initialValues={{
                           login_email,
                           login_password,
                        }}
                        validationSchema={loginValidation}
                     >
                        {
                           (form) => (
                              <Form>
                                 <LoginInput 
                                    type="email"
                                    name="login_email"
                                    icon="email" 
                                    placeholder="E-mail addess"
                                    onChange={handleChange}
                                 />
                                 <LoginInput 
                                    type="password"
                                    name="login_password"  
                                    icon="password" 
                                    placeholder="Password"
                                    onChange={handleChange}
                                 />
                                 <CircledIconBtn type="submit" text="Sign In"/>
                                 <div className={styles.forgot}>
                                    <Link href="/forgot">Forgot Password ?</Link>
                                 </div>
                              </Form>
                           )
                        }
                     </Formik>
                  </div>
               </div>
            </div>
         <Footer country="Peru"/>
      </>
   );
};

export default Signin;
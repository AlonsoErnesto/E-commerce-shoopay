import { useState } from 'react';
import Link from 'next/link'
import { BiLeftArrowAlt } from 'react-icons/bi';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import styles from '@/styles/forgot.module.scss';
import Header from '@/components/header';
import Footer from '@/components/footer';
import CircledIconBtn from '@/components/buttons/circledIconBtn';
import LoginInput from '@/components/inputs/loginInput';


const Forgot = () => {

   const [email, setEmail] = useState("");
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");
   const [success, setSuccess] = useState("");
   const emailValidation = Yup.object({
      email:Yup.string()
         .required("You'll need this when you log in and if you ever need to reset your password.")
         .email("Enter a valid email address.")
   });
   const forgotHandler = async () => {

   }
   return (
      <>
         <Header country=""/>
         <div className={styles.forgot}>
            <div>
               <div className={styles.forgot__header}>
                  <div className={styles.back__svg}>
                     <BiLeftArrowAlt/>
                  </div>
                  <span>
                     Forgot your password? <Link href="/"> Login instead</Link>
                  </span>
               </div>
                  {/* Form */}
                  <Formik
                     enableReinitialize
                     initialValues={{
                        email
                     }}
                     validationSchema={emailValidation}
                     onSubmit={()=>{
                        forgotHandler();
                     }}
                  >
                     {
                        (form) => (
                           <Form>
                              <LoginInput 
                                 type="email"
                                 name="email"
                                 icon="email" 
                                 placeholder="E-mail addess"
                                 onChange={(e)=>setEmail(e.target.value)}
                              />
                              <CircledIconBtn type="submit" text="Next step"/>
                              {
                                 error && 
                                 (<span className={styles.error}>{error}</span>)
                              }
                           </Form>
                        )
                     }
                  </Formik>
               </div>
            </div>
         <Footer country=""/>
      </>
   );
};

export default Forgot;
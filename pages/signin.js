import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';
import {BiLeftArrowAlt} from "react-icons/bi";
import styles from "../styles/signin.module.scss";
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import LoginInput from '@/components/inputs/loginInput';
import CircledIconBtn from '@/components/buttons/circledIconBtn';
import { getCsrfToken, getProviders, getSession, signIn } from 'next-auth/react';
import DotLoaderSpinner from '@/components/loaders/dotLoader';
import Router from 'next/router';

const initialValues = {
   login_email : "",
   login_password:"",
   name : "",
   email:"",
   password:"",
   conf_password:"",
   success:"",
   error:"",
   login_error:""
};
const Signin = ({providers,callbackUrl,csrfToken}) => {

   const [loading, setLoading] = useState(false);
   const [user, setUser] = useState(initialValues);
   const { 
      login_email,
      login_password,
      name, 
      email, 
      password, 
      conf_password,
      success,
      error,
      login_error 
   } = user;
   const handleChange = (e) => {
      const {name, value} = e.target;
      setUser({...user,[name]:value});
   };
   const loginValidation = Yup.object({
      login_email:Yup.string().required("Email address is required.").email('Please enter a valid email address.'),
      login_password:Yup.string().required("Password is required"),
   });

   const registerValidation = Yup.object({
      name : Yup.string()
         .required("What's your name?")
         .min(2,"First name must be between 2 and 16 characters.")
         .max(16,"First name must be between 16 and 2 characters.")
         .matches(/^[aA-zZ]/,'Numbers and special characters are not allowed.'),
      email:Yup.string().required("Email address is required.").email('Please enter a valid email address.'),
      password:Yup.string()
         .required("Password is required")
         .min(6,"Password must be between 25 and 6 characters.")
         .max(25,"Password must be between 6 and 25 characters."),
      conf_password:Yup.string()
         .required("Confirm your password.")
         .oneOf([Yup.ref("password")],"Password must match."),
   });

   const signUpHandler = async () => {
      try {
         setLoading(true);
         const { data } = await axios.post('/api/auth/signup',{
            name, email, password
         });
         setUser({...user,success:data.message,error:""});
         setLoading(false);
         setTimeout(async()=>{
            let options = {
               redirect:false,
               email:email,
               password:password,
            };
            await signIn("credentials",options);
            return Router.push("/");
         },2000);
      } catch(error){
         setLoading(false);
         setUser({...user,success:"",error:error.response.data.message})
      }
   };

   const signInHandler = async () => {
      setLoading(true);
      let options = {
         redirect:false,
         email:login_email,
         password:login_password,
      };
      const res = await signIn("credentials",options);
      setUser({...user,success:"",error:""});
      setLoading(false);
      if(res?.error){
         setLoading(false);
         setUser({...user,login_error:res?.error});
      } else {
         return Router.push(callbackUrl || "/");
      };
   };

   return (
      <>
      {
         loading && <DotLoaderSpinner loading={loading}/>
      }
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
                        onSubmit={()=>{
                           signInHandler();
                        }}
                     >
                        {
                           (form) => (
                              <Form method='post' action="/api/auth/signin/email">
                                 <input
                                    type='hidden'
                                    name="csrfToken"
                                    defaultValue={csrfToken}
                                 />
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
                                 {
                                    login_error && 
                                    (<span className={styles.error}>{login_error}</span>)
                                 }
                                 <div className={styles.forgot}>
                                    <Link href="/forgot">Forgot Password ?</Link>
                                 </div>
                              </Form>
                           )
                        }
                     </Formik>
                     <div className={styles.login__socials}>
                        <span className={styles.or}>
                           Or continue with 
                        </span>
                        <div className={styles.login__socials_wrap}>
                           {
                              providers.map((provider)=> {
                                 if(provider.name === "Credentials"){
                                    return ;
                                 }
                                 return (
                                    <div key={provider.name}>
                                       <button 
                                          className={styles.social__btn}
                                          onClick={()=>signIn(provider.id)}
                                       >
                                          <img src={`./icons/${provider.name}.png`} alt=""/>
                                          Sign in with {provider.name}
                                       </button>
                                    </div>
                                 )
                              })
                           }
                        </div>
                     </div>
                  </div>
               </div>
               <div className={styles.login__container}>
                  <div className={styles.login__form}>
                     <h1>Sign Up</h1>
                     <p>
                        Get access to one of the best Eshopping services in the world.
                     </p>
                     {/* Form */}
                     <Formik
                        enableReinitialize
                        initialValues={{
                           name,
                           email,
                           password,
                           conf_password
                        }}
                        validationSchema={registerValidation}
                        onSubmit={()=>{
                           signUpHandler()
                        }}
                     >
                        {
                           (form) => (
                              <Form>
                                 <LoginInput 
                                    type="tex"
                                    name="name"
                                    icon="user" 
                                    placeholder="Full Bane"
                                    onChange={handleChange}
                                 />
                                 <LoginInput 
                                    type="text"
                                    name="email"  
                                    icon="email" 
                                    placeholder="Email Address"
                                    onChange={handleChange}
                                 />
                                 <LoginInput 
                                    type="password"
                                    name="password"  
                                    icon="password" 
                                    placeholder="Password"
                                    onChange={handleChange}
                                 />
                                 <LoginInput 
                                    type="password"
                                    name="conf_password"  
                                    icon="password" 
                                    placeholder="Re-Type Password"
                                    onChange={handleChange}
                                 />
                                 <CircledIconBtn type="submit" text="Sign Up"/>
                              </Form>
                           )
                        }
                     </Formik>
                     <div>{error && <span className={styles.success} >{success}</span>}</div>
                     <div>{success && <span className={styles.error} >{error}</span>}</div>
                  </div>
               </div>
            </div>
         <Footer country="Peru"/>
      </>
   );
};
export default Signin;


export async function getServerSideProps (context) {
   const {req,query} = context;
   const session = await getSession({req});
   const {callbackUrl} = query;
   if(session){
      return {
         redirect:{
            destination:callbackUrl
         },
      };
   };
   const csrfToken = await getCsrfToken(context);
   const providers = Object.values(await getProviders());
   return {
      props : {
         providers,
         csrfToken,
         callbackUrl
      }
   };
};
import Footer from '@/components/footer';
import Header from '../components/header';
import axios from 'axios';
import { useSession, signIn, signOut } from 'next-auth/react';

const Home = ({country}) => {

  const { data:session } = useSession();
  console.log(session)
  return (
    <>
      <div>
        <Header country={country}/>
        {
          session ? "you are logged in" : "you are NOT LOGGED in"
        }
        <Footer country={country}/>
      </div>
    </>
  )
};

export async function getServerSideProps () {
  const http = `https://api.ipregistry.co/66.165.2.7?key=x8v3a4dpkatfmjq1`
  let data = await axios.get(http).then((res)=>{
    return res.data.location.country;
  }).catch((err)=>{
    console.log(err)
  });
  return {
    props  :{ 
      country : {
        name : data.name,
        flag : data.flag.emojitwo
      }
    },
  };
}

export default Home;
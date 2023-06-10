import React from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth.js'
import Slider from '../components/Layout/Slider/slider';


const HomePage = () => {
   const [auth,setAuth]=useAuth();
  return (
    <Layout title={'HomePage'}>
      <Slider>
        {/* <pre>{JSON.stringify(auth,null,4)}</pre> */}
        </Slider>
    </Layout>
  )
}

export default HomePage
import React, { useState } from 'react';
import image from '../../assects/logo.jpeg'
import Sidebar from '../Sidebar/Sidebar';

const Login = () => {


  return (
    <>
    <Sidebar/>
    <div className='container'>
   <div className="home-image d-flex align-items-center justify-content-center mt-5 w-full h-80">
          <img  className="home-image" src={image}></img>
        </div>
    </div>
    </>
  )
}

export default Login;

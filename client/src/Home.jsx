import React from 'react'

const Home = () => {
  return (
    <>
  <div className='d-flex mt-3 justify-content-center align-item-center '>
    <h1 className='text-danger text-center  mt-4'>Welcome to Amrversity</h1>  
  <div className='d-flex justify-content-end align-items-center'><a href='/register' className='btn btn-info mx-4' >Sign Up</a> <a href='/login' className='btn btn-info ' > Login </a></div></div>
   <img width={'100%'} height={'700vh'} src="https://png.pngtree.com/thumb_back/fh260/background/20231001/pngtree-energetic-university-student-engaged-with-laptop-3d-illustration-image_13571921.png" alt="" />
  </>
  )
}

export default Home
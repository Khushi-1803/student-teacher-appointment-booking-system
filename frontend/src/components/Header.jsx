import React from 'react'
import {assets} from '../assets/app'

const Header = () => {
  return (
    <div className='flex flex-col h-96  md:flex-row flex-wrap bg-cyan-900 rounded-lg  lg:px-20 mt-5'>
      {/*-----Left side*-----*/ }
      <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py[10vw] md:mb-[-30px]'>
        <p className='flex justify-center flex-col sm:flex-col items-center mb-3 text-2xl md:text-3xl lg:text-4xl text-white font-semibold leading-tight md:leading-tight '>
            Book Appointment<br/>With Trusted Teachers
        </p>
        <div className='flex flex-col sm:flex-col  items-center gap-3 text-white text-sm font-light mb-24'>
            <img className='w-12 ' src={assets.teal_icon} alt="" />
            <p>Simply browse through extensive list of trusted teachers,<br className='hidden sm:block'/>schedule your appointment hassle-free</p>
            <a href="#speciality" className='flex  items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm  md:m-0 hover:scale-105 transition-all duration-300 mb-10'>
            Book appointment <img className='w-5 h-5' src={assets.arrow_icon} alt=""/>
        </a>
        </div>
        
      </div>

      {/*-----Right side*-----*/ }
      <div className='md:w-1/2 relative'>
        <img className='hidden md:block lg:w-full md:absolute md:h-72 md:w-60  rounded-lg mt-11 ml-8'  src={assets.header_pic} alt=''/>
      </div>
    </div>
  )
}

export default Header

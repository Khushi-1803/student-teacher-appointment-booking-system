import React from 'react'
import {assets} from '../assets/app'

const Footer = () => {
  return (
    <div className='md:mx-10'>
    <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        {/* {left section} */}
      <div>
        <img className='mb-0 w-24' src={assets.Logo} alt='' />
       
        <p className='w-full text-left text-gray-600 leading-6'>Our platform connects students and teachers by allowing them to schedule one-on-one appointments easily. Whether you need academic guidance, project help, or mentorship, we're here to support effective communication and learning.</p>
      </div>

      {/* {center section} */}
      <div>
        <p className='text-xl font-medium mb-5'>COMPANY</p>
        <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Privacy policy</li>
        </ul>
      </div>

      {/* {right section} */}
      <div>
        <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
        <ul  className='flex flex-col gap-2 text-gray-600'>
            <li> +1 (123) 456-7890</li>
            <li>support@bookingplatform.com</li>
        </ul>
      </div>
    </div>
     
        {/* {copyright text} */}
        <div>
            <hr/>
            <p className='py-5 text-sm text-center'>
                © 2025 Student-Teacher Booking Platform. All rights reserved.
            </p>
        </div>
      </div>
    
  )
}


export default Footer

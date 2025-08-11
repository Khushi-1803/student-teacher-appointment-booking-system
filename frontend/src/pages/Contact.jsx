import React from 'react'
import { assets } from '../assets/app'

const Contact = () => {
  return (
    <div>
      <div className='mt-2'>
        <p className='font-bold text-xl'>CONTACT <span className='font-bold text-gray-600 text-xl'>US</span></p>
      </div>
        <div className='flex flex-row gap-14 mt-4 border border-dotted border-gray-400 px-6 py-8 h-96'>
          <img className=' hidden sm:block w-80 h-80 ' src={assets.contact_img} alt="" />
        <div className=' w-full space-y-2 h-80 bg-white sm:bg-gray-50'>
            <p className='mt-10'>📧 Email: support@booking-system.edu</p>
            <p>📞Call Us: +1 (555) 123-4567</p>
           <p>🕒 Live Support: Mon–Fri | 9 AM – 5 PM</p>
           <p className=''>
            <p className='mt-6 font-semibold'>Carrier At EduWave</p>
            <p className='mt-4'>Empowering seamless student-teacher connections through smart scheduling and communication.</p>
           </p>
         
        </div>
      </div>
    </div>
  
  )
}

export default Contact

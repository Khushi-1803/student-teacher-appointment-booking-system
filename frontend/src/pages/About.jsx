import React from 'react'
import {assets} from '../assets/app'

const About = () => {
  return (
    <div>
      
      <div className='text-center text-2xl pt-10 font-bold'>
        <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className ='w-full hidden sm:block md:max-w-[360px] h-96 rounded-xl' src = {assets.about_img} alt="" />
      
      <div className=' "w-full flex  flex-col gap-4 bg-cyan-900 text-white rounded-xl p-5 border-2 border-cyan-200 font-light'>
        <p>The Student-Teacher Booking Appointment System is an easy-to-use platform that helps students schedule meetings with their teachers. It removes the need for back-and-forth communication by showing available time slots and allowing direct booking.</p>

        <p>Teachers can set their availability, manage appointments, and stay organized with built-in reminders and scheduling tools. Students benefit by being able to quickly find open slots and book appointments without delays.</p>

        <b>Our Vision</b>

        <p>This system improves communication, saves time, and supports a better learning environment. It’s a simple yet powerful tool for enhancing student-teacher interaction and academic support.</p>
      </div>
    </div>
    <div className=' hidden sm:block'>
      <div>
      <p className='font-bold text-xl '>Why Choose Us</p>
      </div>
    {/* left */}
    <div className='flex flex-col md:flex-row mt-4 '>
    <div className='bg-cyan-900 border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-black  text-white transition-all duration-300   cursor-pointer'>
     <b>Efficiency</b>
     <p >The system streamlines scheduling by eliminating manual coordination and reducing missed appointments.
      Teachers and students save time with automated bookings and real-time availability updates.</p>
    </div>

    {/* center */}
    <div className='bg-cyan-900 border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-black text-white transition-all duration-300  cursor-pointer'>
     <b>Convenience</b>
     <p>Users can access the platform anytime, from any device, to book or manage appointments.
      Automated reminders and easy rescheduling make the process smooth and stress-free.</p>
    </div>

    {/* right */}
    <div className='bg-cyan-900 border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-black text-white transition-all duration-300  cursor-pointer'>
     <b>Personalization</b>
     <p>
      Teachers can customize their availability, meeting types, and duration to fit their preferences.
      Students receive a tailored booking experience based on their course or academic needs.
     </p>
    </div>
    </div>
    </div>
    </div>
  )
}

export default About



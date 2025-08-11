import React from 'react'
import { specialityData } from '../assets/app'
import { Link } from 'react-router-dom'
const SpecialityMenu = () => {
  return (
    <div  className='flex flex-col items-center gap-4 py-16 text-gray-800' id='speciality'>
      <h1 className='text-3xl font-medium'>Find by Speciality</h1>
      <p className='sm:w-1/3 text-center text-sm'>Sipmly browse through our extensive list of teachers,schedule your appointment hassle-free </p>
      <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll '>
        {specialityData.map((item,index)=>(
            <Link onClick={()=>scollTo(0,0)} className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-alll duration-500 key={index} to={`/teachers/${item.speciality}`}' key={index} to={`/teachers/${item.speciality}`}>
                <img className=' w-16 sm:w-24 mb-2 rounded-full' src={item.image} alt='' />
                <p className='text-center'>{item.speciality}</p>
            </Link>
        ))}
      </div>
    </div>
  )
}

export default SpecialityMenu

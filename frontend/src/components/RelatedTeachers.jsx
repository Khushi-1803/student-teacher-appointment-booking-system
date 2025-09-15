import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedTeachers = ({speciality,teachersId}) => {
  const {teachers} = useContext(AppContext)
  const navigate = useNavigate()

  const [relatedTeachers,setRelatedTeachers] = useState([])
  useEffect(()=>{
    if(teachers.length > 0 && speciality){
      const teachersData = teachers.filter((teachers)=>teachers.speciality === speciality && teachers._id !== teachersId)
      setRelatedTeachers(teachersData)
    }

  },[teachers,speciality,teachersId])
  return (
    

      <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
      <h1 className='text-3xl font-medium'>Top Teachers to Book</h1>
      <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted teachers</p>
      <div className='w-full grid grid-cols-auto  gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
        {relatedTeachers.slice(0,5).map((item,index)=>(
          <div onClick={()=>{navigate(`/appointment/${item._id}`);scrollTo(0,0)}} key={index} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all  duration-500'>
            <img className='rounded-xl h-48' src={item.image} alt=''/>
            <div className='p-4'>
              <div className={`flex  gap-2 text-sm text-center ${item.available ? 'text-green-500' : 'text-red-500'}  `}>
                <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-red-500'  } rounded-full`}></p><p>{item.available ? 'Available' : 'Not available'}</p>
              </div>
              <p className='text-left text-gray-900 text-lg font-medium'>{item.name}</p>
              <p className='text-left text-gray-600 text-sm'>{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <button onClick={()=>{navigate('/teachers'); scrollTo(0,0)}} className='bg-cyan-200 text-gray-600 px-12 py-3 rounded-full mt-10'>More</button>
    </div>
      
   
  )
}

export default RelatedTeachers

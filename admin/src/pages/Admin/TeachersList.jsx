import React, { useEffect,useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'

const TeachersList = () => {
  const {teachers, aToken, getAllTeachers,changeAvailability} = useContext(AdminContext)
  useEffect(()=>{
    if (aToken) {
      getAllTeachers()
    }
  },[aToken])
  return (
    <div className='w-72 sm:w-full m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Teachers</h1>
      <div  className='flex flex-wrap w-full gap-4 pt-5 gap-y-6'>
        {
          teachers.map((item,index)=>(
            <div className='border border-cyan-400 rounded-xl nax-w-56 overflow-hidden cursor-pointer group' key={index}>
              <img className="transition duration-300 hover:scale-105 hover:shadow-lg hover:brightness-110" src={item.image} alt=''/>
              <div className='p-4'>
                <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
                <p className='text-zinc-600 text-sm'>{item.speciality}</p>
                <div>
                  <input onChange={()=>changeAvailability(item._id)} className='mt-2 flex items-center gap-1 text-sm' type='checkbox' checked={item.available}/>
                  <p>Available</p>
                </div>

              </div>
            </div>

          ))
        }
      </div>
    </div>
  )
}

export default TeachersList

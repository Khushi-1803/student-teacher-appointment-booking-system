

import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { TeacherContext } from '../context/TeacherContext'

const Sidebar = () => {
    const {aToken} = useContext(AdminContext)
    const {tToken} = useContext(TeacherContext)   
  return (
    <div className='min-h-screen bg-white border-r'>
      {
        aToken && <ul className='text-[#515151] mt-5 '>
        <NavLink className={({isActive})=>`flex items-center gap-3 mb-4   md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'text-cyan-900 text-2xl border-r-4 border-cyan-900' : ''}`} to={'/admin-dashboard'}>
            <img className=' w-10 h-10' src = {assets.home_icon} alt=''/>
            <p className='hidden md:block '>Dashboard</p>
        </NavLink>

        <NavLink className={({isActive})=>`flex items-center gap-3 mb-4  md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'text-cyan-900 text-2xl  border-r-4 border-cyan-900' : ''}`} to={'/all-appointments'}>
            <img className='w-10 h-10 flex-shrink-0' src = {assets.appointment_icon} alt=''/>
            <p className='hidden md:block '>Appointment</p> 
        </NavLink>

        <NavLink className={({isActive})=>`flex items-center gap-3 mb-4  md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'text-cyan-900 text-2xl  border-r-4 border-cyan-900' : ''}`} to={'/add-teacher'}>
            <img className='w-10 h-10 flex-shrink-0 ' src = {assets.add_icon} alt=''/>
            <p className='hidden md:block '>Add Teacher</p>
        </NavLink>

        <NavLink className={({isActive})=>`flex items-center gap-3 mb-4  md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'text-cyan-900 text-2xl border-r-4 border-cyan-900' : ''}`} to={'/teacher-list'}>
            <img className='w-10 h-10 ' src = {assets.users_icon} alt=''/>
            <p className='hidden md:block '>Teacher List</p>
        </NavLink>   
        </ul>
      }

      {
        tToken && <ul className='text-[#515151]  mt-5'>
        <NavLink className={({isActive})=>` flex items-center gap-3  md:px-9 md:min-w-72 mb-4 cursor-pointer ${isActive ? 'text-cyan-900 text-2xl border-r-4 border-cyan-900' : ''}`} to={'/teacher-dashboard'}>
            <img className=' w-10 h-10 min-w-[20px] min-h-[40px] flex-shrink-0' src = {assets.home_icon} alt=''/>
            <p className='hidden md:block '>Dashboard</p> 
        </NavLink>
      

        <NavLink className={({isActive})=>`flex items-center gap-3  md:px-9 md:min-w-72 mb-4 cursor-pointer ${isActive ? 'text-cyan-900 text-2xl  border-r-4 border-cyan-900' : ''}`} to={'/teacher-appointments'}>
            <img className='w-10 h-10' src = {assets.appointment_icon} alt=''/>
            <p className='hidden md:block'>Appointment</p>
        </NavLink>
        

        <NavLink className={({isActive})=>`flex items-center gap-3 md:px-9 md:min-w-72 mb-4 cursor-pointer ${isActive ? 'text-cyan-900 text-2xl border-r-4 border-cyan-900' : ''}`} to={'/teacher-profile'}>
            <img className='w-10 h-10' src = {assets.users_icon} alt=''/>
            <p className='hidden md:block'>Profile</p>
        </NavLink>
        
        
        </ul>
      }
      
    </div>  
  )
}

export default Sidebar                       


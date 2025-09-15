import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import {useNavigate} from 'react-router-dom'
import { TeacherContext } from '../context/TeacherContext'


const Navbar = () => {
    const {aToken,setAToken} = useContext(AdminContext)
    const {tToken, setTToken} = useContext(TeacherContext)
    const navigate = useNavigate()
    

    const logout = () => {
      navigate('/')
      aToken && setAToken('')
      aToken && localStorage.removeItem('aToken')
      tToken && setTToken('')
      tToken && localStorage.removeItem('tToken')
    }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
      <div className='flex items-center gap-2 text-xs'>
       <div className="flex items-center mr-4">
               <img
                 onClick={() => navigate("/")}
                 className="h-10 w-auto sm:h-12 md:h-14 cursor-pointer object-contain"
                 src={assets.admin_logo}
                 alt="EduWave Logo"
               />
               <p className=" text-xs sm:text-xs md:text-xs">EduWave</p>
             </div>
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500'>{aToken ? 'Admin' : 'Teacher'}</p>
      </div>
      <button onClick={logout} className='bg-cyan-900 text-white text-sm px-10 py-2 rounded-full'>Logout</button>
    </div>
  )
}

export default Navbar

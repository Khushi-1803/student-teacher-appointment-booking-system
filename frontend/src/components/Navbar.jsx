import React, { useContext, useState } from 'react'
import {assets} from "../assets/app"
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Navbar = () => {

const navigate = useNavigate();

const {token,setToken,userData} = useContext(AppContext)

const[showMenu,setShowMenu] = useState(false)

const logout = () =>{
  setToken(false)
   localStorage.removeItem('token') 
  
}


  return (
    <div className='flex  justify-between items-center text-sm border-b border-b-gray-400'>
      <img onClick={()=>navigate('/')} className = "w-12 cursor-pointer" src={assets.Logo} alt="" />
      
      <ul className='hidden md:flex items-start gap-5 font-medium mb-2'>
        <NavLink to='/'>
            <li className='py-1'>HOME</li>
            <hr className='border-none outline-none h-0.5  w-3/5 m-auto hidden bg-cyan-900' />
        </NavLink>
        <NavLink to='/teachers'>
            <li className='py-1'>All TEACHERS</li>
            <hr className='border-none outline-none h-0.5  w-3/5 m-auto hidden bg-cyan-900' />
        </NavLink>
        <NavLink to='/about'>
            <li className='py-1'>ABOUT</li>
            <hr className='border-none outline-none h-0.5  w-3/5 m-auto hidden bg-cyan-900' />
        </NavLink>
        <NavLink to='/contact'>
            <li className='py-1'>CONTACT US</li>
            <hr className='border-none outline-none h-0.5  w-3/5 m-auto hidden bg-cyan-900' />
        </NavLink>
      </ul>
      <div className='flex items-center gap-4'> 
        {
        token && userData
        ?<div className='flex items-center gap-2 cursor-pointer group relative mb-2'>
          <img className='w-10 h-10 rounded-full items-center' src={userData.image} alt="" />
          <span className='ml-3'>&#9776;</span>
          <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
            <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
              <p onClick ={()=>navigate("my-profile")} className='hover:text-black cursor-pointer'>My profile</p>
              <p onClick ={()=>navigate("my-appointments")} className='hover:text-black cursor-pointer'>My appointments</p>
              <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
            </div>
          </div>
        </div>
        :<button onClick ={()=>navigate('/login')} className='bg-cyan-900 text-white px-8 py-3 rounded-full font-light hidden mb-2 md:block'>Create Account</button>
        }
        <img onClick={()=>setShowMenu(true)} className='w-8 h-8 cursor-pointer md:hidden' src={assets.menu_icon} alt="" />
        {/* mobile menu */}
        <div className={` ${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
          <div className='flex justify-between items-center p-4 border-b border-b-gray-400'>
            <img className='w-36' src= {assets.Logo} alt=''/>
            <img className='w-7' onClick={()=>setShowMenu(false)} src={assets.cross_icon} alt=""/>
          </div>
          <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium '>
            <NavLink onClick={()=>setShowMenu(false)} to='/'>
              <li className='px-4 py-2 rounded-full inline-block'>HOME</li>
            </NavLink>
            <NavLink onClick={()=>setShowMenu(false)} to='/teachers'>
              <li className='px-4 py-2 rounded-full inline-block'>All TEACHERS</li>
            </NavLink>
            <NavLink onClick={()=>setShowMenu(false)} to='/about'>
              <li className='px-4 py-2 rounded-full inline-block'>ABOUT</li>
            </NavLink>
            <NavLink onClick={()=>setShowMenu(false)} to='/contact'>
              <li className='px-4 py-2 rounded-full inline-block'>CONTACT US</li>
            </NavLink>  
          </ul>
        </div>
        </div>
    </div>
  )
}

export default Navbar

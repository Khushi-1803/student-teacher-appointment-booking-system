import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/app.js'
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile = () => {
const {userData,setUserData,token,backendUrl,loadUserProfileData} = useContext(AppContext)


const [isEdit, setIsEdit] = useState(false);

const [image,setImage] = useState(false)
const updateUserProfileData = async()=>{
      try {
        const formData = new FormData()
        formData.append('name',userData.name)
        formData.append('phone',userData.phone)
        formData.append('address',userData.address)
        formData.append('gender',userData.gender)
        formData.append('class',userData.class)
        image && formData.append('image',image)

        const {data} = await axios.post(backendUrl + '/api/user/update-profile',formData,{headers:{Authorization: `Bearer ${token}`}})
        if (data.success) {
          toast.success(data.message)
          await loadUserProfileData()
          setIsEdit(false)
          setImage(false)
        }else{
          toast.error(data.message)
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message)
        
      }
}


  return  userData && (
    <div className='flex flex-col sm:flex-row  items-center justify-center gap-10 mt-20 '>
      <div className=' md:block md:w-1/2 relative '>
       
        {
          isEdit
          ?
          <input type='text' value={userData.name} onChange={e=>setUserData(prev => ({...prev,name:e.target.value}))}/>
          :
          <label className='mt-5  font-bold text-xl'>{userData.name} <p className='text-green-600 font-light text-sm'> Premium User</p></label>
        }

        {
          isEdit
          ?<label htmlFor='image'>
            <div className='inline-block relative cursor-pointer'>
              <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image):userData.image} alt="" />
              <img className='w-10 absolute bottom-12 right-12' src={image ? "" :assets.uploadd_icon} alt="" />
            </div>
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden />
          </label>
          :<img className=' h-60 w-60 rounded-full mx-auto mt-8' src= {userData.image} alt='' />
        }

         

      </div>


      <div className='h-96 w-full bg-white sm:shadow-lg rounded-md p-5  space-y-4 '>
        <p className='mb-1 font-bold text-xl'>CONTACT INFORMATION</p>
        <div className='space-y-2'>
          <div className='flex justify-center flex-row gap-2'>
            <p>Email id:</p>
            <p>{userData.email}</p>
          </div>

          <div className='flex justify-center flex-row gap-2'>
            <p>Phone:</p>
          {
            isEdit
          ?
          <input type='text' value={userData.phone} onChange={e=>setUserData(prev => ({...prev,phone:e.target.value}))}/>
          :
          <p>{userData.phone}</p>
          }
          </div>

          <div className='flex justify-center flex-row gap-2'>
            <p>Address:</p>
          {
            isEdit
            ?<label>
              <input onChange={(e) => setUserData(prev=>({...prev,address:e.target.value}))} value={userData.address} type='text' />
             
            </label>  
            :<label>
              {userData.address}
            </label>
          }
          </div>
          <div className='space-y-2'>
        <p className='mt-5 font-bold text-xl'>BASIC INFORMATION</p>
        <div className='space-y-2'>
          <div className='flex justify-center flex-row gap-2'>
            <p>Gender:</p>
          {
          isEdit
          ?
         <select onChange={(e)=>setUserData(prev=> ({...prev,gender:e.target.value}))} value={userData.gender}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
         </select>
          :
          <p>{userData.gender}</p>
        }
          </div>

         <div className='flex justify-center flex-row gap-2 '>
           <p>Class:</p>
          {
            isEdit
            ?
            <input type='number' value={userData.class} onChange={e=>setUserData(prev => ({...prev,class:e.target.value}))}/>
            :
            <p>{userData.class}</p>
          }
         </div>

        </div>
      </div>
      </div>
      <div className='mt-5'>
        {
          isEdit
          ?
          <button onClick={updateUserProfileData} className='bg-cyan-700 text-white px-6 py-2 rounded'>Save</button>
          :
          <button onClick={()=>setIsEdit(true)} className='bg-cyan-700 text-white px-6 py-2 rounded'>Edit</button>
        }
      </div>
      </div>
      

    
      
    </div>

    
  )
}

export default MyProfile

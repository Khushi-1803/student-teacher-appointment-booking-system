import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import {toast} from 'react-toastify'
import axios from 'axios'

const AddTeacher = () => {
 
    const [teacherImg,setTeacherImg] = useState(false)
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [experience,setExperience] = useState('1 year')
    const [fees,setFees] = useState('')
    const [about,setAbout] = useState('')
    const [speciality,setSpeciality] = useState('Physics')
    const [degree,setDegree] = useState('')
    const [address,setAddress] = useState('')

    const {backendUrl, aToken} = useContext(AdminContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        try {
            if (!teacherImg) {
                return toast.error('Image Not Selected')
            }

            const formData = new FormData()
            formData.append('image',teacherImg)
            formData.append('name',name)
            formData.append('email',email)
            formData.append('password',password)
            formData.append('experience',experience)
            formData.append('fees',Number(fees))
            formData.append('about',about)
            formData.append('speciality',speciality)
            formData.append('degree',degree)
            formData.append('address',address)

            //console log formData
            formData.forEach((value,key) => {
                console.log(`${key} : ${value}`);
                
            })

            const {data} = await axios.post(backendUrl + '/api/admin/add-teacher',formData,{headers:{aToken}})

            if (data.success) {
                toast.success(data.message)
                setTeacherImg(false)
                setName('')
                setPassword('')
                setEmail('')
                setAddress('')
                setDegree('')
                setAbout('')
                setFees('')
            }else{
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error);
            
        }
    }

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-meduim">Add Teacher</p>
      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="teacher-img">
            <img className="w-16 h-16 rounded-full cursor-pointer" src={teacherImg ? URL.createObjectURL(teacherImg) : assets.uploadd_icon} alt="" />
          </label>
          <input onChange={(e)=>setTeacherImg(e.target.files[0])} type="file" id="teacher-img" hidden />
          <p>
            Upload teacher <br /> picture
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">

            <div className="flex-1 flex flex-col gap-1">
              <p>Teacher name</p>
              <input onChange={(e)=>setName(e.target.value)} value={name} className="border rounded px-3 py-1" type="text" placeholder="enter the name" required />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Teacher email</p>
              <input onChange={(e)=>setEmail(e.target.value)} value={email} className="border rounded px-3 py-1" type="email" placeholder="enter the email" required />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Teacher password</p>
              <input onChange={(e)=>setPassword(e.target.value)} value={password} className="border rounded px-3 py-1" type="password" placeholder="enter the password" required/>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Experience</p>
              <select onChange={(e)=>setExperience(e.target.value)} value={experience} className="border rounded px-3 py-1" name="" id="">
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Fees</p>
              <input onChange={(e)=>setFees(e.target.value)} value={fees} className="border rounded px-3 py-1" type="number" placeholder="enter the fees" required />
            </div>
          </div>

          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Speciality</p>
              <select onChange={(e)=>setSpeciality(e.target.value)} value={speciality} className="border rounded px-3 py-1">
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Maths">Maths</option>
                <option value="Biology">Biology</option>
                <option value="Engish">Engish</option>
                <option value="Hindi">Hindi</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Education</p>
              <input onChange={(e)=>setDegree(e.target.value)} value={degree} className="border rounded px-3 py-1" type="text" placeholder="education" required />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Address</p>
              <input onChange={(e)=>setAddress(e.target.value)} value={address} className="border rounded px-3 py-1" type="text" placeholder="enter the address" required />
            </div>
          </div>
      </div>
       <div>
            <p className="mt-4 mb-2">About Teacher</p>
            <textarea onChange={(e)=>setAbout(e.target.value)} value={about} className="w-full px-4 pt-2 mb-4 border rounded" placeholder="write about teacher" rows={5} required />
          </div>
          <button type='submit' className='bg-cyan-900 px-10 py-3  text-white rounded-full cursor-pointer'>Add teacher</button>
        </div>
    </form>
  );
};

export default AddTeacher;

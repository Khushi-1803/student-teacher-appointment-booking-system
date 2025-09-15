import React, { useContext} from 'react'
import { AppContext } from '../context/AppContext'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const MyAppointments = () => {
  const {backendUrl,token,getTeachersData} = useContext(AppContext)
  const [appointments,setAppointments] = useState([])


  //making the date in 18 Feb 2004 format
  const months =  [" ","Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const navigate = useNavigate()

  const slotDateFormat = (slotDate) =>{
  const  dateArray = slotDate.split('_')
    return dateArray[0]+" "+months[Number(dateArray[1])]+ " "+dateArray[2]
  }
  

  const getUserAppointments = async()=>{
    try {
      const {data} = await axios.get(backendUrl+'/api/user/appointments',{headers: {Authorization: `Bearer ${token}`}})
      if (data.success) {
        setAppointments(data.appointments.reverse())
        console.log(data.appointments);
        
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  }
  //integrating cancel appointment with frontend
  const cancelAppointment = async(appointmentId)=>{
    try {
      const {data} = await axios.post(backendUrl+ '/api/user/cancel-appointment',{appointmentId},{headers:{Authorization: `Bearer ${token}`}})
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getTeachersData()
      // console.log(appointmentId);
      
      }else{
        toast.error(data.message)
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  

const initPay = (order, appointmentId) => {
  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: order.amount,
    currency: order.currency,
    name: 'Appointment Payment',
    description: 'Appointment Payment',
    order_id: order.id, // use `order.id` from backend, not `_id`
    handler: async (response) => {
      console.log("Razorpay response:", response);
      
      try {
        const {data} = await axios.post(backendUrl+'/api/user/verify-payment',response,{headers: { Authorization: `Bearer ${token}` }})
        if (data.success) {
          getUserAppointments()
          navigate('my-appointments')
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message)
      }
    }
  };
  const rzp = new window.Razorpay(options);
  rzp.open();
};

  const appointmentRazorpay = async(appointmentId)=>{
  try {
    const {data } = await axios.post(backendUrl+ '/api/user/payment-razorpay',{appointmentId},{headers:{Authorization: `Bearer ${token}`}})
    if (data.success) {
      initPay(data.order, appointmentId)
      
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message)
  }

}
  useEffect(()=>{
    if (token) {
      getUserAppointments()
    }
  },[token])

   
  return (
    <div>
      <p className='pb-3 mt-6 text-xl border-b'>My Appointments</p>
      <div>
        {appointments.map((item, index) => (
          <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>

            <div>
              <img className='w-60'  src={item.teacherData.image} alt="" />
            </div>

            <div className='flex-1 text-sm text-zinc-600'>
              <p className=''><span className=' text-neutral-700 font-medium'> Name:</span> {item.teacherData.name}</p>
              <p ><span className=' text-neutral-700 font-medium'>Speciality:</span> {item.teacherData.speciality}</p>
              <p><span className=' text-neutral-700 font-medium'>Address:</span> {item.teacherData.address}</p>
              
              <p className=''><span className=' text-neutral-700 font-medium'>Date & Time: </span>{slotDateFormat(item.slotDate)} | {item.slotTime}</p>
            </div>
            <div></div>

            <div className='flex flex-col gap-2 justify-center'>
              {!item.cancelled && item.payment && <button className='sm:min w-48 py-2 border rounded text-stone-500 bg-indigo-50'>Paid</button>}
              {!item.cancelled && !item.payment && <button onClick={()=>appointmentRazorpay(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-cyan-900 hover:text-white transition-all duration-300'> Pay online</button>}

              {!item.cancelled && !item.isCompleted && <button onClick={()=>cancelAppointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel appointment</button> }
              {item.cancelled && !item.isCompleted && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment cancelled</button>}

              {item.isCompleted && <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Completed</button>}
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments

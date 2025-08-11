

import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/app'
import RelatedTeachers from '../components/RelatedTeachers'
import { toast } from 'react-toastify'
import axios from 'axios'

const Appointment = () => {
  const { teacherId } = useParams()
  const { teachers, backendUrl, token, getTeachersData } = useContext(AppContext)
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT']

  const navigate = useNavigate()

  const [teacherInfo, setTeacherInfo] = useState(null)
  const [teacherSlots, setTeacherSlot] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState("")

  const fetchTeacherInfo = async () => {
    const teacherInfo = teachers.find(teachers => teachers._id === teacherId)
    setTeacherInfo(teacherInfo)
  }

  const getAvailableSlots = async () => {
    setTeacherSlot([])
    let today = new Date()

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0)

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        let day = currentDate.getDate()
        let month = currentDate.getMonth() + 1
        let year = currentDate.getFullYear()

        const slotDate = day + "_" + month + "_" + year
        const slotTime = formattedTime

        const isSlotAvailable = teacherInfo.slotes_booked[slotDate] &&
          teacherInfo.slotes_booked[slotDate].includes(slotTime)
          ? false
          : true

        if (isSlotAvailable) {
          timeSlots.push({
            dateTime: new Date(currentDate),
            time: formattedTime
          })
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      setTeacherSlot(prev => ([...prev, timeSlots]))
    }
  }

  const bookedAppointment = async () => {
    if (!token) {
      toast.warn('Login to book appointment')
      return navigate('/login')
    }
    try {
      const date = teacherSlots[slotIndex][0].dateTime
      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()
      const slotDate = day + "_" + month + "_" + year

      const { data } = await axios.post(
        backendUrl + '/api/user/book-appointment',
        { teacherId, slotDate, slotTime },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (data.success) {
        toast.success(data.message)
        getTeachersData()
        navigate('/my-appointments')
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchTeacherInfo()
  }, [teachers, teacherId])

  useEffect(() => {
    if (teacherInfo) {
      getAvailableSlots()
    }
  }, [teacherInfo])

  useEffect(() => {
    console.log(teacherSlots)
  }, [teacherSlots])

  return teacherInfo && (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
      {/* Doctor/Teacher Details */}
      <div className='flex flex-col sm:flex-row gap-4 mt-6'>
        <div>
          <img
            className='w-full h-48 sm:h-52 md:max-w-72 rounded-lg object-cover'
            src={teacherInfo.image}
            alt=""
          />
        </div>

        <div className='flex-1 border border-gray-400 rounded-lg p-4 sm:p-8 py-6 sm:py-7 bg-white h-auto sm:h-52 mt-4 sm:mt-0'>
          <p className='flex items-center gap-2 text-lg sm:text-2xl font-medium text-gray-900'>
            {teacherInfo.name}
            <img className='w-4 sm:w-5' src={assets.verified_icon} alt="" />
          </p>
          <div className='flex items-center text-sm mt-1 text-gray-600 gap-2 flex-wrap'>
            <p>{teacherInfo.degree} - {teacherInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>
              {teacherInfo.experience}
            </button>
          </div>

          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
              About <img className='w-4 sm:w-5' src={assets.info_icon} alt="" />
            </p>
            <p className='text-sm text-gray-500 max-w-[700px] mb-1 text-left'>
              {teacherInfo.about}
            </p>
          </div>

          <p className='text-left text-gray-500 font-medium'>
            Appointment fee: <span className='text-gray-600'>{teacherInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className='mt-12 font-medium text-gray-700'>
        <p className="text-lg mb-3 text-left">Booking Slots</p>

        <div className='flex gap-3 items-center w-full overflow-x-auto scrollbar-hide mt-4'>
          {
            teacherSlots.length && teacherSlots.map((item, index) => (
              <div
                onClick={() => setSlotIndex(index)}
                className={`text-center py-6 min-w-16 rounded-full cursor-pointer flex-shrink-0 
                  ${slotIndex === index ? 'bg-cyan-900 text-white' : 'border border-gray-200 text-gray-700'}`}
                key={index}>
                <p>{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
                <p>{item[0] && item[0].dateTime.getDate()}</p>
              </div>
            ))
          }
        </div>

        <div className='flex items-center gap-3 w-full overflow-x-auto scrollbar-hide mt-4 responsive-slot-buttons'>
          {
            teacherSlots.length && teacherSlots[slotIndex].map((item, index) => (
              <p
                onClick={() => setSlotTime(item.time)}
                className={`text-sm font-light flex-shrink-0 px-4 py-2 rounded-full cursor-pointer 
                  ${item.time === slotTime ? 'bg-cyan-900 text-white' : 'text-gray-400 border border-gray-300'}`}
                key={index}
              >
                {item.time.toLowerCase()}
              </p>
            ))
          }
        </div>

        <button
          onClick={bookedAppointment}
          className='bg-cyan-900 text-white text-sm sm:text-base font-light px-10 sm:px-14 py-3 rounded-full my-4 sm:my-6 w-full sm:w-fit'
        >
          Book an Appointment
        </button>
      </div>

      {/* Related Teachers */}
      <RelatedTeachers teacherId={teacherId} speciality={teacherInfo.speciality} />
    </div>
  )
}

export default Appointment












import React, {useContext} from 'react'
import Login from './pages/Login.jsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {AdminContext} from './context/AdminContext'
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import AddTeacher from './pages/Admin/AddTeacher';
import TeachersList from './pages/Admin/TeachersList';
import { TeacherContext } from './context/TeacherContext';
import TeacherDashboard from './pages/Teacher/TeacherDashboard.jsx';
import TeacherAppointments from './pages/Teacher/TeacherAppointments.jsx';
import TeacherProfile from './pages/Teacher/TeacherProfile.jsx';


const App = () => {

  const {aToken} = useContext(AdminContext)
  const {tToken} = useContext(TeacherContext)

  return aToken || tToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          {/* admin routes */}
          <Route path = '/' element={<></>} />
          <Route path = '/admin-dashboard' element={<Dashboard/>} />
          <Route path = '/all-appointments' element={<AllAppointments/>} />
          <Route path = '/add-teacher' element={<AddTeacher/>} />
          <Route path = '/teacher-list' element={<TeachersList/>} />
          {/* teaher routes */}
          <Route path = '/teacher-dashboard' element={<TeacherDashboard/>} />
          <Route path = '/teacher-appointments' element={<TeacherAppointments/>} />
          <Route path = '/teacher-profile' element={<TeacherProfile/>} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
    <Login /> 
    <ToastContainer />
    </>
  )
}

export default App

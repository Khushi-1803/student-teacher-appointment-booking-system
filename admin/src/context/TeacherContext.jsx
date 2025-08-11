import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export const TeacherContext = createContext();
const TeacherContextProvider = (props) => {
  //logic for teacher login
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [tToken, setTToken] = useState(
    localStorage.getItem("tToken") ? localStorage.getItem("tToken") : ""
  );
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);
  const [profileData, setProfileData] = useState(false);

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/teacher/appointments",
        {
          headers: {
            Authorization: `Bearer ${tToken}`, // ✅ not just tToken
          },
        }
      );
      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  //function to mark the appointment completed
  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/teacher/complete-appointment",
        { appointmentId },
        { headers: { Authorization: `Bearer ${tToken}` } }
      );
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  //function to mark the appointment cancelled
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/teacher/cancel-appointment",
        { appointmentId },
        { headers: { Authorization: `Bearer ${tToken}` } }
      );
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  //function for dashboard data
  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/teacher/dashboard", {
        headers: { Authorization: `Bearer ${tToken}` },
      });
      if (data.success) {
        setDashData(data.dashData);
        console.log(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  //function to fetch profile data from api
  const getProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/teacher/profile", {
        headers: { Authorization: `Bearer ${tToken}` },
      });
      if (data.success) {
        setProfileData(data.profileData);
        console.log(data.profileData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const value = {
    tToken,
    setTToken,
    backendUrl,
    appointments,
    setAppointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
    dashData,
    setDashData,
    getDashData,
    profileData,
    setProfileData,
    getProfileData,
  };
  return (
    <TeacherContext.Provider value={value}>
      {props.children}
    </TeacherContext.Provider>
  );
};

export default TeacherContextProvider;

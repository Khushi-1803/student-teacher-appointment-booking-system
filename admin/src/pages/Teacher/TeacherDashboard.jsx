import React, { useContext, useEffect } from "react";
import { TeacherContext } from "../../context/TeacherContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const TeacherDashboard = () => {
  const { tToken, dashData, setDashData, getDashData,completeAppointment,cancelAppointment } =
    useContext(TeacherContext);
  const { slotDateFormat } = useContext(AppContext);
  useEffect(() => {
    if (tToken) {
      getDashData();
    }
  }, [tToken]);
  return (
    dashData && (
      <div className="w-72 sm:w-[75vh] m-5  overflow-y-scroll">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white p-2 min-w-40 h-20 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-10 h-10" src={assets.teacher_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.teachers}
              </p>
              <p className="text-gray-400">Teachers</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-2 min-w-40 h-20 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-10 h-10" src={assets.appointments_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.appointments}
              </p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-2 min-w-40 h-20 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-10 h-10" src={assets.student_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.users}
              </p>
              <p className="text-gray-400">Students</p>
            </div>
          </div>
        </div>

        <div className="bg-white">
          <div className="flex items-center gap-2.5 px-4 py-1 mt-10 rounded-t border">
            <img src={assets.list_icon} alt="" />
            <p className="font-semibold">Latest Bookings</p>
          </div>
          <div className="pt-4 border border-t-0">
            {dashData.latestAppointments.map((item, index) => (
              <div
                className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
                key={index}
              >
                <img
                  className="rounded-full w-10 h-10"
                  src={item.userData.image}
                  alt=" "
                />
                <div className="flex-1 test-sm">
                  <p className="text-gray-800 font-medium ">
                    {item.userData.name}
                  </p>
                  <p className="text-gray-600 ">
                    {slotDateFormat(item.slotDate)}
                  </p>
                </div>
                {item.cancelled ? (
                  <p className="text-red-500 text-xs font-medium">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-500 text-xs font-medium">
                    Completed
                  </p>
                ) : (
                  <div className="flex">
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      className="w-10 h-10 cursor-pointer rounded-full"
                      src={assets.cancel_icon}
                      alt=""
                    />
                    <img
                      onClick={() => completeAppointment(item._id)}
                      className="w-10 cursor-pointer"
                      src={assets.check_icon}
                      alt=""
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default TeacherDashboard;

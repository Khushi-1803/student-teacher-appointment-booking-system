// import { teachers } from "../../frontend/src/assets/app.js";
import teacherModel from "../models/teacherModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

const changeAvailability = async (req, res) => {
  try {
    const { teacherId } = req.body;
    const teacherData = await teacherModel.findById(teacherId);
    await teacherModel.findByIdAndUpdate(teacherId, {
      available: !teacherData.available,
    });
    res.json({ success: true, message: "Availability Changed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// const teacherList = async (req, res) => {
//   try {
//     const teachers = await teacherModel
//       .find({})
//       .select(["-password", "-email"]);
//     res.json({ success: true, teachers });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };
//api for teacher login
const teacherList = async (req, res) => {
  try {
    const teachers = await teacherModel
      .find({})
      .select(["-password", "-email"]);

    const backendUrl = process.env.BACKEND_URL; // e.g., https://myapp-backend.onrender.com

    const updatedTeachers = teachers.map(teacher => {
      const t = teacher.toObject();
      if (t.image && !t.image.startsWith("http")) {
        t.image = `${backendUrl}/${t.image}`;
      }
      return t;
    });

    res.json({ success: true, teachers: updatedTeachers });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


const loginTeacher = async (req, res) => {
  try {
    const { email, password } = req.body;
    const teacher = await teacherModel.findOne({ email });

    if (!teacher) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }
    const isMatch = await bcrypt.compare(password, teacher.password);

    if (isMatch) {
      const token = jwt.sign({ id: teacher._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api to get teacher appointments for teacher panel

const appointmentsTeacher = async (req, res) => {
  try {
    const teacherId = req.teacherId; //not req.body
    const appointments = await appointmentModel.find({ teacherId });

    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//api to mark appointment completed for teacher panel

const appointmentComplete = async (req, res) => {
  try {
    const teacherId = req.teacherId;
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.teacherId === teacherId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });
      return res.json({ success: true, message: "Marked Completed" });
    } else {
      return res.json({ success: false, message: "Marked Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//api to cancel appointment for teacher panel
const appointmentCancel = async (req, res) => {
  try {
    const teacherId = req.teacherId;
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.teacherId === teacherId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      return res.json({ success: true, message: "Appointment cancelled" });
    } else {
      return res.json({ success: false, message: "Cancilation Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//api to get dashboard data for teacher apnel
const teacherDashboard = async (req, res) => {
  try {
    const teacherId = req.teacherId;
    const appointments = await appointmentModel.find({ teacherId });

    let students = [];
    appointments.map((item) => {
      if (!students.includes(item.userId)) {
        students.push(item.userId);
      }
    });
    const dashData = {
      appointments: appointments.length,
      students: students.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };
    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//api to get teacher profile to get teacher panel
const teacherProfile = async (req, res) => {
  try {
    const teacherId = req.teacherId;
    const profileData = await teacherModel
      .findById(teacherId)
      .select("-password");

    res.json({ success: true, profileData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//api to update teacher profile from teacher panel
const updateTeacherProfile = async (req, res) => {
  try {
    const teacherId = req.teacherId;
    const { fees, address, available } = req.body;

    await teacherModel.findByIdAndUpdate(teacherId, {
      fees,
      address,
      available,
    });
    res.json({ success: true, message: "Profile updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  changeAvailability,
  teacherList,
  loginTeacher,
  appointmentsTeacher,
  appointmentCancel,
  appointmentComplete,
  teacherDashboard,
  teacherProfile,
  updateTeacherProfile,
};

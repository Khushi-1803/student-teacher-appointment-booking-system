
import validator from 'validator';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import teacherModel from '../models/teacherModel.js';
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js';
import userModel from '../models/userModel.js';

const addTeacher = async (req, res) => {
  try {
    const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
    const imageFile = req.file;

    // Validate required fields
    if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address || !imageFile) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }

    // Validate password strength
    if (password.length < 8) {
      return res.json({ success: false, message: "Please enter a strong password" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Upload to Cloudinary using buffer
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: 'image' },
      async (error, result) => {
        if (error) {
          console.log(error);
          return res.json({ success: false, message: "Image upload failed" });
        }

        const teacherData = {
          name,
          email,
          image: result.secure_url,
          password: hashedPassword,
          speciality,
          degree,
          experience,
          about,
          fees,
          address,
          date: Date.now(),
        };

        const newTeacher = new teacherModel(teacherData);
        await newTeacher.save();

        res.json({ success: true, message: "Teacher added" });
      }
    );

    stream.end(imageFile.buffer); // send file buffer to cloudinary
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API for admin login



const loginAdmin= async(req,res) => {
  try {
    const {email,password} = req.body
    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
      const token = jwt.sign(email+password,process.env.JWT_SECRET)
      res.json({success:true,token})
    }else{
      res.json({success:false,message:"Invalid credentials"})
    }
    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

//API to get all teachers list for admin pannel
const allTeachers = async(req,res)=>{
  try {
    const teachers = await teacherModel.find({}).select('-password')
    res.json({success:true,teachers})
    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }


}
//api to get all appointmenta list


const appointmentAdmin = async(req,res)=>{
  try {
    const appointments = await appointmentModel.find({})//getting all appointments of user and teacher
    res.json({success:true,appointments})

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

//api for appointment cancellation
const appointmentCancel = async (req,res) =>{
  try {
    const {appointmentId} = req.body
   
    const appointmentData = await appointmentModel.findById(appointmentId)
    
    await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
    //releasing teacher slot
    const {teacherId,slotDate,slotTime} = appointmentData
    const teacherData = await teacherModel.findById(teacherId)
    let slotes_booked = teacherData.slotes_booked
    slotes_booked[slotDate] =  slotes_booked[slotDate].filter(e=> e!== slotTime)
    await teacherModel.findByIdAndUpdate(teacherId,{slotes_booked})
    res.json({success:true,message:'Appointment canclled'})
  } catch (error) {
     console.log(error);
     res.json({ success: false, message: error.message });
  }
}
//api to get dashboard data for admin pannel
const adminDashboard = async(req,res) =>{
  try {
    const teachers = await teacherModel.find({})
    const users = await userModel.find({})
    const appointments = await appointmentModel.find({})

    const dashData = {
      teachers:teachers.length,
      appointments:appointments.length,
      users: users.length,
      latestAppointments:appointments.reverse().slice(0,5)
    }
    res.json({success:true,dashData})


  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}
export { addTeacher,loginAdmin,allTeachers,appointmentAdmin,appointmentCancel,adminDashboard};

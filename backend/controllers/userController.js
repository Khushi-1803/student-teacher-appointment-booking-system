import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import teacherModel from "../models/teacherModel.js";
import appointmentModel from "../models/appointmentModel.js";
import razorpay from 'razorpay'
// api to register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !password || !email) {
      return res.json({ success: false, message: "Missing Details" });
    }
    //validating email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid email" });
    }
    //validating strong pasword
    if (password.length < 8) {
      return res.json({ success: false, message: "Enter a strong password" });
    }

    // hashing users password
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,

      password: hashedpassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token });

    //creating token
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api to get user profile data
const getProfile = async (req, res) => {
  try {
    const userData = await userModel.findById(req.userId).select("-password");
    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api to update user profile
const updateProfile = async (req, res) => {
  try {
    const {name, phone, address, gender, class: userClass} = req.body; 
    const userId = req.userId;
    const imageFile = req.file; //if we want to update profile so we will send it to api

    if (!name || !phone  || !gender) {
      return res.json({ success: false, message: "data missing" });
    }
    await userModel.findByIdAndUpdate(userId, {
      name, 
      phone,
      address,
      class: userClass,
      gender,
    });

    // image is uploading directly to database using multer memory storage 
    if (imageFile) {
      const stream = cloudinary.uploader.upload_stream(   //when we use memory stream we have to use upload stream
        { resource_type: "image" },
        async (error, result) => {
          if (error) {
            console.error("Cloudinary Error:", error);
            return res.json({ success: false, message: "Image upload failed" });
          }

          const imageURL = result.secure_url; //storng image

          await userModel.findByIdAndUpdate(userId, {
            image: imageURL,  //deploying image
          });

          res.json({ success: true, message: "Profile updated with image" });
        }
      );

      stream.end(imageFile.buffer); // send buffer to cloudinary
    } else {
      res.json({ success: true, message: "Profile updated without image" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to book appointment
const bookAppointment = async(req,res) =>{
  try {
    const {teacherId,slotDate,slotTime} = req.body
    const userId = req.userId

    const teacherData = await teacherModel.findById(teacherId).select('-password')

    if (!teacherData.available) {
      return res.json({success:false,message:"Teacher not available"})
    }

    let slotes_booked = teacherData.slotes_booked || {} 

    //checking for slots availability
    if (slotes_booked[slotDate]) {
      if (slotes_booked[slotDate].includes(slotTime)) {
        return res.json({success:false,message:"Slot not available"})
      }else{
        slotes_booked[slotDate].push(slotTime)
      }
      
    }else{
      slotes_booked[slotDate] = []
      slotes_booked[slotDate].push(slotTime)
    }

    const userData = await userModel.findById(userId).select('-password')

    delete teacherData.slotes_booked // we dont want to keep booked slots history

    const appointmentData = {
      userId,
      teacherId,
      userData,
      teacherData,
      amount:teacherData.fees,
      slotTime,
      slotDate,
      date:Date.now()
    }
    const newAppointment = new appointmentModel(appointmentData)
    await newAppointment.save() //saving in database

    //save new slot data in teachers data
    await teacherModel.findByIdAndUpdate(teacherId,{slotes_booked})

    res.json({success:true,message:"Appointment booked"})

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}
//api to get user appointment for frontend my-appointment page
const listAppointment = async(req,res) =>{
  try {
    const userId = req.userId  
    const appointments = await appointmentModel.find({userId})

    res.json({success:true,appointments})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}
//api for cancel appointment
const cancelAppointment = async (req,res) =>{
  try {
    const {appointmentId} = req.body
    const userId = req.userId
    const appointmentData = await appointmentModel.findById(appointmentId)
    //verify appointment user
    if (appointmentData.userId !== userId) {
      return res.json({success:false,message:"Unauthorized action"})
    }
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

export { registerUser, loginUser, getProfile, updateProfile,bookAppointment,listAppointment,cancelAppointment};

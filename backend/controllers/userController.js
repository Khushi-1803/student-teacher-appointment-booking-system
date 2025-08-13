// import validator from "validator";
// import bcrypt from "bcrypt";
// import userModel from "../models/userModel.js";
// import jwt from "jsonwebtoken";
// import { v2 as cloudinary } from "cloudinary";
// import teacherModel from "../models/teacherModel.js";
// import appointmentModel from "../models/appointmentModel.js";
// import Razorpay from "razorpay";
// // api to register user
// const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     if (!name || !password || !email) {
//       return res.json({ success: false, message: "Missing Details" });
//     }
//     //validating email format
//     if (!validator.isEmail(email)) {
//       return res.json({ success: false, message: "Enter a valid email" });
//     }
//     //validating strong pasword
//     if (password.length < 8) {
//       return res.json({ success: false, message: "Enter a strong password" });
//     }

//     // hashing users password
//     const salt = await bcrypt.genSalt(10);
//     const hashedpassword = await bcrypt.hash(password, salt);

//     const userData = {
//       name,
//       email,

//       password: hashedpassword,
//     };

//     const newUser = new userModel(userData);
//     const user = await newUser.save();

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//     res.json({ success: true, token });

//     //creating token
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// //api for user login
// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await userModel.findOne({ email });

//     if (!user) {
//       return res.json({ success: false, message: "User does not exist" });
//     }
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (isMatch) {
//       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//       res.json({ success: true, token });
//     } else {
//       res.json({ success: false, message: "Invalid credentials" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// //api to get user profile data
// const getProfile = async (req, res) => {
//   try {
//     const userData = await userModel.findById(req.userId).select("-password");
//     res.json({ success: true, userData });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// //api to update user profile
// const updateProfile = async (req, res) => {
//   try {
//     const { name, phone, address, gender, class: userClass } = req.body;
//     const userId = req.userId;
//     const imageFile = req.file; //if we want to update profile so we will send it to api

//     if (!name || !phone || !gender) {
//       return res.json({ success: false, message: "data missing" });
//     }
//     await userModel.findByIdAndUpdate(userId, {
//       name,
//       phone,
//       address,
//       class: userClass,
//       gender,
//     });

//     // image is uploading directly to database using multer memory storage
//     if (imageFile) {
//       const stream = cloudinary.uploader.upload_stream(
//         //when we use memory stream we have to use upload stream
//         { resource_type: "image" },
//         async (error, result) => {
//           if (error) {
//             console.error("Cloudinary Error:", error);
//             return res.json({ success: false, message: "Image upload failed" });
//           }

//           const imageURL = result.secure_url; //storng image

//           await userModel.findByIdAndUpdate(userId, {
//             image: imageURL, //deploying image
//           });

//           res.json({ success: true, message: "Profile updated with image" });
//         }
//       );

//       stream.end(imageFile.buffer); // send buffer to cloudinary
//     } else {
//       res.json({ success: true, message: "Profile updated without image" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// //API to book appointment
// const bookAppointment = async (req, res) => {
//   try {
//     const { teacherId, slotDate, slotTime } = req.body;
//     const userId = req.userId;

//     const teacherData = await teacherModel
//       .findById(teacherId)
//       .select("-password");

//     if (!teacherData.available) {
//       return res.json({ success: false, message: "Teacher not available" });
//     }

//     let slotes_booked = teacherData.slotes_booked || {};

//     //checking for slots availability
//     if (slotes_booked[slotDate]) {
//       if (slotes_booked[slotDate].includes(slotTime)) {
//         return res.json({ success: false, message: "Slot not available" });
//       } else {
//         slotes_booked[slotDate].push(slotTime);
//       }
//     } else {
//       slotes_booked[slotDate] = [];
//       slotes_booked[slotDate].push(slotTime);
//     }

//     const userData = await userModel.findById(userId).select("-password");

//     delete teacherData.slotes_booked; // we dont want to keep booked slots history

//     const appointmentData = {
//       userId,
//       teacherId,
//       userData,
//       teacherData,
//       amount: teacherData.fees,
//       slotTime,
//       slotDate,
//       date: Date.now(),
//     };
//     const newAppointment = new appointmentModel(appointmentData);
//     await newAppointment.save(); //saving in database

//     //save new slot data in teachers data
//     await teacherModel.findByIdAndUpdate(teacherId, { slotes_booked });

//     res.json({ success: true, message: "Appointment booked" });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };
// //api to get user appointment for frontend my-appointment page
// const listAppointment = async (req, res) => {
//   try {
//     const userId = req.userId;
//     const appointments = await appointmentModel.find({ userId });

//     res.json({ success: true, appointments });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };
// //api for cancel appointment
// const cancelAppointment = async (req, res) => {
//   try {
//     const { appointmentId } = req.body;
//     const userId = req.userId;
//     const appointmentData = await appointmentModel.findById(appointmentId);
//     //verify appointment user
//     if (appointmentData.userId !== userId) {
//       return res.json({ success: false, message: "Unauthorized action" });
//     }
//     await appointmentModel.findByIdAndUpdate(appointmentId, {
//       cancelled: true,
//     });
//     //releasing teacher slot
//     const { teacherId, slotDate, slotTime } = appointmentData;
//     const teacherData = await teacherModel.findById(teacherId);
//     let slotes_booked = teacherData.slotes_booked;
//     slotes_booked[slotDate] = slotes_booked[slotDate].filter(
//       (e) => e !== slotTime
//     );
//     await teacherModel.findByIdAndUpdate(teacherId, { slotes_booked });
//     res.json({ success: true, message: "Appointment canclled" });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };
// const razorpayInstance = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });
// // API to make payment of appointment using razorpay
// const paymentRazorpay = async (req, res) => {
//   try {
//     const { appointmentId } = req.body;
//     const appointmentData = await appointmentModel.findById(appointmentId);
//     if (!appointmentData || appointmentData.cancelled) {
//       return res.json({
//         success: false,
//         message: "Appointment cancelled or not found",
//       });
//     }
//     //creating options for razorpay payment
//     const options = {
//       amount: appointmentData.amount * 100,
//       currency: process.env.CURRENCY,
//       receipt: appointmentId,
//     };
//     //creation of an oreder
//     const order = await razorpayInstance.orders.create(options);
//     res.json({ success: true, order });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// export {
//   registerUser,
//   loginUser,
//   getProfile,
//   updateProfile,
//   bookAppointment,
//   listAppointment,
//   cancelAppointment,
//   paymentRazorpay
// };

import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import teacherModel from "../models/teacherModel.js";
import appointmentModel from "../models/appointmentModel.js";
import Razorpay from "razorpay";
import crypto from "crypto";



// api to register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !password || !email) {
      return res.status(400).json({ success: false, message: "Missing details" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Enter a valid email" });
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Enter a strong password (min 8 chars)" });
    }

    // Check for existing user
    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.status(409).json({ success: false, message: "Email already registered" });
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

    return res.status(201).json({ success: true, token });
  } catch (error) {
    console.error("registerUser error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// api for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return res.json({ success: true, token });
  } catch (error) {
    console.error("loginUser error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// api to get user profile data
const getProfile = async (req, res) => {
  try {
    const userData = await userModel.findById(req.userId).select("-password");
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    return res.json({ success: true, userData });
  } catch (error) {
    console.error("getProfile error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// api to update user profile
const updateProfile = async (req, res) => {
  try {
    const { name, phone, address, gender, class: userClass } = req.body;
    const userId = req.userId;
    const imageFile = req.file; // multer memory storage expected

    if (!name || !phone || !gender) {
      return res.status(400).json({ success: false, message: "Data missing" });
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address,
      class: userClass,
      gender,
    });

    // handle image upload if provided
    if (imageFile) {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "image" },
        async (error, result) => {
          if (error) {
            console.error("Cloudinary Error:", error);
            return res.status(500).json({ success: false, message: "Image upload failed" });
          }

          try {
            const imageURL = result.secure_url;
            await userModel.findByIdAndUpdate(userId, { image: imageURL });
            return res.json({ success: true, message: "Profile updated with image" });
          } catch (err) {
            console.error("Saving image URL error:", err);
            return res.status(500).json({ success: false, message: "Failed to save image URL" });
          }
        }
      );

      // send buffer to cloudinary
      stream.end(imageFile.buffer);
    } else {
      return res.json({ success: true, message: "Profile updated without image" });
    }
  } catch (error) {
    console.error("updateProfile error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// API to book appointment
const bookAppointment = async (req, res) => {
  try {
    const { teacherId, slotDate, slotTime } = req.body;
    const userId = req.userId;

    if (!teacherId || !slotDate || !slotTime) {
      return res.status(400).json({ success: false, message: "Missing booking details" });
    }

    const teacherData = await teacherModel.findById(teacherId).select("-password");
    if (!teacherData) {
      return res.status(404).json({ success: false, message: "Teacher not found" });
    }

    if (!teacherData.available) {
      return res.status(400).json({ success: false, message: "Teacher not available" });
    }

    // clone slotes_booked so we don't accidentally mutate the mongoose doc in a confusing way
    const slotes_booked = { ...(teacherData.slotes_booked || {}) };

    // checking for slots availability
    if (slotes_booked[slotDate]) {
      if (slotes_booked[slotDate].includes(slotTime)) {
        return res.status(409).json({ success: false, message: "Slot not available" });
      } else {
        slotes_booked[slotDate].push(slotTime);
      }
    } else {
      slotes_booked[slotDate] = [slotTime];
    }

    const userData = await userModel.findById(userId).select("-password");
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // avoid embedding the full slot history in the appointment's teacherData
    const teacherSnapshot = {
      _id: teacherData._id,
      name: teacherData.name,
      fees: teacherData.fees,
      // add other public fields you want to snapshot
    };

    const appointmentData = {
      userId,
      teacherId,
      userData,
      teacherData: teacherSnapshot,
      amount: teacherData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    // save new slot data in teacher's document
    await teacherModel.findByIdAndUpdate(teacherId, { slotes_booked });

    return res.status(201).json({ success: true, message: "Appointment booked" });
  } catch (error) {
    console.error("bookAppointment error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// api to get user appointment for frontend my-appointment page
const listAppointment = async (req, res) => {
  try {
    const userId = req.userId;
    const appointments = await appointmentModel.find({ userId }).sort({ date: -1 });
    return res.json({ success: true, appointments });
  } catch (error) {
    console.error("listAppointment error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// api for cancel appointment
const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    if (!appointmentId) {
      return res.status(400).json({ success: false, message: "Appointment ID required" });
    }

    const userId = req.userId;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    // verify appointment user (use toString to compare ObjectId vs string)
    if (appointmentData.userId.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized action" });
    }

    // mark cancelled
    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

    // releasing teacher slot
    const { teacherId, slotDate, slotTime } = appointmentData;
    const teacherData = await teacherModel.findById(teacherId);
    if (teacherData && teacherData.slotes_booked && teacherData.slotes_booked[slotDate]) {
      const updatedSlots = teacherData.slotes_booked[slotDate].filter((e) => e !== slotTime);
      const newSlotes = { ...(teacherData.slotes_booked || {}) };
      newSlotes[slotDate] = updatedSlots;
      await teacherModel.findByIdAndUpdate(teacherId, { slotes_booked: newSlotes });
    }

    return res.json({ success: true, message: "Appointment cancelled" });
  } catch (error) {
    console.error("cancelAppointment error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Razorpay instance
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// API to make payment of appointment using Razorpay
const paymentRazorpay = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    if (!appointmentId) {
      return res.status(400).json({ success: false, message: "Appointment ID is required" });
    }

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }
    if (appointmentData.cancelled) {
      return res.status(400).json({ success: false, message: "Appointment has been cancelled" });
    }

    // Ensure amount is a valid positive number
    const amountInRupees = Number(appointmentData.amount);
    if (isNaN(amountInRupees) || amountInRupees <= 0) {
      return res.status(400).json({ success: false, message: "Invalid appointment amount" });
    }

    const options = {
      amount: Math.round(amountInRupees * 100), // convert to paise and round to integer
      currency: process.env.CURRENCY || "INR",
      receipt: appointmentId.toString(),
    };

    console.log("Razorpay order create options:", options);

    const order = await razorpayInstance.orders.create(options);

    return res.json({ success: true, order });
  } catch (error) {
    console.error("paymentRazorpay error:", error);
    if (error.response) {
      console.error("Razorpay API response:", error.response);
    }
    return res.status(500).json({ success: false, message: error.message || "Payment creation failed" });
  }
};


// const verifyRazorpay = async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature, appointmentId } = req.body;

//     const sign = razorpay_order_id + "|" + razorpay_payment_id;
//     const expectedSign = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(sign)
//       .digest("hex"); 

//     if (expectedSign !== razorpay_signature) {
//       return res.status(400).json({ success: false, message: "Invalid signature" });
//     }  

//     // ✅ Mark appointment as paid
//     await appointmentModel.findByIdAndUpdate(appointmentId, {
//       paid: true,
//       paymentId: razorpay_payment_id
//     });

//     return res.json({ success: true, message: "Payment verified successfully" });
//   } catch (error) {
//     console.error("verifyRazorpayPayment error:", error);
//     return res.status(500).json({ success: false, message: "Payment verification failed" });
//   }
// };

const verifyRazorpay = async(req,res)=>{
  try {
    const {razorpay_order_id} = req.body
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
    
   
    if (orderInfo.status === 'paid') {
      await appointmentModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
      res.json({success:true,message:"Payment Successful"})
    }else{
      res.json({success:false,message:"Payment Failed"})
    }
    
  } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
    
  }
}

export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  paymentRazorpay,
  verifyRazorpay
};


import Logo from './Logo.png'
import T1 from './T1.jpg'
import T2 from './T2.jpg'
import T3 from './T3.jpg'
import T4 from './T4.jpg'
import T5 from './T5.jpg'
import T6 from './T6.jpg'
import T7 from './T7.jpg'
import T8 from './T8.jpg'
import T9 from './T9.jpg'
import T10 from './T10.jpg'
import T11 from './T11.jpg'
import T12 from './T12.jpg'
import T13 from './T13.jpg'
import T14 from './T14.jpg'
import T15 from './T15.jpg'
import profile_pic from './profile_pic.jpg'
import header_pic from './header_pic.jpg'
import teal_icon from './teal_icon.png'
import arrow_icon from './arrow_icon.png'
import s_physics from './s_physics.png'
import s_chemistry from './s_chemistry.png'
import s_maths from './s_maths.png'
import s_bio from './s_bio.png'
import s_eng from './s_eng.png'
import s_hindi from './s_hindi.png'
import appointment_img from './appointment_img.jpg'
import verified_icon from './verified_icon.png'
import info_icon from './info_icon.png'
import about_img from './about_img.png'
import contact_img from './contact_img.jpg'
import myprofile_img from './myprofile_img.webp'
import menu_icon from './menu_icon.jpg'
import cross_icon from './cross_icon.webp'
import default_profile from './default_profile.jpg'




export const assets = {
  Logo,
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  T8,
  T9,
  T10,
  T11,
  T12,
  T13,
  T14,
  T15,
  profile_pic,
  teal_icon,
  header_pic,
  arrow_icon,
  s_physics,
  s_chemistry,
  s_maths,
  s_bio,
  s_eng,
  s_hindi,
  appointment_img,
  verified_icon,
  info_icon,
  about_img,
  contact_img,
  myprofile_img,
  menu_icon,
  cross_icon,
  default_profile
}

export const specialityData =[
    {
        speciality: "Physics",
        image: s_physics
        
    },

    {
        speciality: "Chemistry",
        image: s_chemistry
        
    },
    {
        speciality: "Maths",
        image:s_maths
        
    },
    {
        speciality: "Biology",
        image: s_bio
        
    },
    {
        speciality: "English",
        image: s_eng
        
    },
    {
        speciality: "Hindi",
        image: s_hindi
    }
    
]


export const teachers = [
    
  {
    _id: "t001",
    image: T1,
    name: "Anita Sharma",
    degree: "MEd",
    experience: "10 years",
    about: "With a deep passion for science and over [X] years of teaching experience, I am dedicated to making chemistry engaging, accessible, and meaningful for all students. My goal is to inspire curiosity and critical thinking by connecting classroom concepts to real-world applications.",
    fees: "₹1/hour",
    address: "Lajpat Nagar",
    speciality: "Chemistry"
  },
  {
    _id: "t002",
     image: T2,
    name: "Rajni Kumari",
    degree: "PhD",
    experience: "5 years",
    about: "I am a passionate mathematics educator with [V] years of experience helping students build confidence and competence in math. My approach focuses on developing a strong foundation in problem-solving, logical reasoning, and real-world application.",
    fees: "₹500/hour",
    address: "Patna",
    speciality: "Maths"
  },
  {
    _id: "t003",
     image: T3,
    name: "Meena Iyer",
    degree: "MSC",
    experience: "10 years",
    about: "Physics is the foundation of how our universe works, and I am passionate about helping students discover its wonders. With [X] years of experience teaching physics, I focus on building a strong conceptual framework through clear explanations, practical demonstrations, and critical thinking exercises.",
    fees: "₹750/hour",
    address: "Chennai",
    speciality: "Physics"
  },
  {
    _id: "t004",
     image: T4,
    name: "Annu Desai",
    degree: "MSC",
    experience: "6 years",
    about: "As a physics teacher, I believe learning should be both meaningful and enjoyable. I strive to create a classroom where students feel excited to ask questions, explore ideas, and connect theory to real-life situations. From motion and energy to electricity and waves, I use hands-on activities, discussions, and problem-solving strategies to make physics approachable and engaging. ",
    fees: "₹400/hour",
    address: "Ahmedabad",
    speciality: "Physics"
  },
  {
    _id: "t005",
     image: T5,
    name: "Pooja Verma",
    degree: "PhD",
    experience: "6 years",
    about: "Hi! I am a physics teacher who loves making complex ideas simple and fun. I believe physics is not just about numbers and laws—it is about understanding how the world works. With a mix of interactive lessons, experiments, and relatable examples, I help students see the  why behind the what",
    fees: "₹600/hour",
    address: "Lucknow",
    speciality: "Physics"
  },
  {
    _id: "t006",
     image: T6,
    name: "Suresh Nair",
    degree: "MTech",
    experience: "10 years",
    about: "Mathematics is the language of logic, and I am passionate about helping students become fluent in it. With over [X] years of teaching experience, I focus on developing strong problem-solving skills and a deep conceptual understanding. ",
    fees: "₹900/hour",
    address: "Kochi",
    speciality: "Maths"
  },
  {
    _id: "t007",
     image: T7,
    name: "Neha Joshi",
    degree: "PhD ",
    experience: "7 years",
    about: "Chemistry is more than a subject—it's a way of understanding the world. As a dedicated chemistry teacher with [X] years of experience, I aim to spark curiosity and cultivate critical thinking in every student. I strive to make complex scientific concepts accessible through hands-on experiments, real-life applications, and interactive learning. ",
    fees: "₹900/hour",
    address: "Pune",
    speciality: "Chemistry"
  },
  {
    _id: "t008",
    name: "Imran Khan",
     image: T8,
    degree: "MEd",
    experience: "9 years",
    about: "As a Hindi teacher with [IX] years of experience, I am passionate about preserving and promoting the richness of the Hindi language and literature. My teaching focuses on building a strong foundation in grammar, vocabulary, and communication while also exploring the cultural and literary depth of Hindi.",
    fees: "₹700/hour",
    address: "Hyderabad",
    speciality: "Hindi"
  },
  {
    _id: "t009",
     image: T9,
    name: "Anjali Reddy",
    degree: "MSC",
    experience: "7 years",
    about: "Biology is the study of life—and teaching it is my passion. With over [X] years of experience in the classroom, I aim to inspire curiosity about the natural world and help students develop a strong scientific foundation. My lessons combine clear explanations with hands-on investigations, encouraging students to ask questions, explore concepts deeply, and think critically. ",
    fees: "₹850/hour",
    address: "Hyderabad",
    speciality: "Biology"
  },
  {
    _id: "t010",
     image: T10,
    name: "Nita Bansal",
    degree: "MA",
    experience: "3 years",
    about: "Namaste! I am a Hindi teacher who believes that learning a language should be fun, interactive, and personal. I strive to create a welcoming classroom where students feel confident practicing speaking, reading, and writing in Hindi. ",
    fees: "₹550/hour",
    address: "New Delhi",
    speciality: "Hindi"
  },
  {
    _id: "t011",
     image: T11,
    name: "Divya Pillai",
    degree: "BSC",
    experience: "5 years",
    about: "Hi there! I am a biology teacher who loves helping students explore the amazing complexity of life. Whether we are learning about the human body, genetics, or the environment, I believe science should be interactive, exciting, and easy to relate to. I create a supportive and inclusive classroom where students feel comfortable asking questions and thinking like scientists.",
    fees: "₹1/hour",
    address: "Kochi",
    speciality: "Biology"
  },
  {
    _id: "t012",
     image: T12,
    name: "kartik Mehta",
    degree: "M.Tech",
    experience: "4 years",
    about: "I have always believed that anyone can learn math with the right support—and that’s exactly what I aim to provide. As a maths teacher, my goal is to make learning approachable, engaging, and even fun! I use real-life examples, interactive activities, and step-by-step strategies to help students overcome challenges and build confidence.",
    fees: "₹500/hour",
    address: "Bengaluru",
    speciality: "Maths"
  },
   {
    _id: "t013",
     image: T13,
    name: "Rohan Das",
    degree: "MSC",
    experience: "6 years",
    about: "Hi! I'm a chemistry teacher who loves turning challenging topics into exciting learning adventures. With a background in science education and a passion for making learning fun, I believe every student can connect with chemistry when it's taught in a relatable and engaging way. ",
    fees: "₹650/hour",
    address: "Kolkata",
    speciality: "Chemistry"
  },
  {
    _id: "t014",
     image: T14,
    name: "Sneha Kulkarni",
    degree: "MA",
    experience: "9 years",
    about: "As an English teacher with a passion for language, literature, and communication, I strive to create a classroom environment where students feel inspired to read deeply, think critically, and express themselves clearly. With [VIII] years of teaching experience, I focus on building strong literacy skills while encouraging creativity and personal voice.",
    fees: "₹800/hour",
    address: "Jaipur",
    speciality: "English"
  },
  {
    _id: "t015",
     image: T15,
    name: "Vikram Singh ",
    degree: "MA",
    experience: "7 years",
    about: "Teaching English is more than just grammar and essays—it's about helping students find their voice, understand diverse perspectives, and connect through language. I bring enthusiasm, patience, and creativity to every lesson, aiming to make literature and writing accessible and enjoyable for all learners. ",
    fees: "₹1000/hour",
    address: "Bengaluru",
    speciality: "English"
  }

    
]



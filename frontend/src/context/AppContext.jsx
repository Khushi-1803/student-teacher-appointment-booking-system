// import { createContext, useEffect, useState } from "react";
// import { teachers } from "../assets/app";
// import axios from "axios";
// import { toast } from "react-toastify";

// export const AppContext = createContext();
// const AppContextProvider = (props) => {
//   const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'
//   // Inside AppContextProvider.js, just after defining backendUrl:


// console.log("Backend URL in frontend build:", backendUrl);

  

//   const [teachers, setTeachers] = useState([]);

//   const [token, setToken] = useState(
//     localStorage.getItem("token") ? localStorage.getItem("token") : ""
//   );

//   const [userData, setUserData] = useState(false);

//   const getTeachersData = async () => {
//     try {
//       const { data } = await axios.get(backendUrl + "/api/teacher/list",{
//          headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (data.success) {
//         setTeachers(data.teachers);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   const loadUserProfileData = async () => {
//     try {
//       const { data } = await axios.get(backendUrl + "/api/user/get-profile", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (data.success) {
//         setUserData(data.userData);
//       } else {
//         toast.error(error.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   const value = {
//     teachers,getTeachersData,
//     token,
//     setToken,
//     backendUrl,
//     userData,
//     setUserData,
//     loadUserProfileData,
//   };
//   useEffect(() => {
//     getTeachersData();
//   }, []);

//   useEffect(() => {
//     if (token) {
//       loadUserProfileData();
//     } else {
//       setUserData(false);
//     }
//   }, [token]);
//   return (
//     <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
//   );
// };

// export default AppContextProvider;




import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  console.log("Backend URL in frontend build:", backendUrl);

  const [teachers, setTeachers] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userData, setUserData] = useState(false);

  // ✅ get teachers list
  const getTeachersData = async () => {
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const { data } = await axios.get(`${backendUrl}/api/teacher/list`, {
        headers,
      });
      if (data.success) {
        setTeachers(data.teachers);
      } else {
        toast.error(data.message || "Failed to load teachers");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // ✅ load user profile
  const loadUserProfileData = async () => {
    if (!token) return; // skip if no token
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message || "Failed to load profile");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
      // optionally clear token if unauthorized:
      if (error.response?.status === 401) {
        setToken("");
        localStorage.removeItem("token");
      }
    }
  };

  // ✅ Expose context values
  const value = {
    teachers,
    getTeachersData,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData,
  };

  useEffect(() => {
    getTeachersData();
  }, [token]); // refresh when token changes if needed

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(false);
    }
  }, [token]);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;

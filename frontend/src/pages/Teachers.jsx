import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/app";

const Teachers = () => {
  const { speciality } = useParams();
  const [filterTeacher, setFilterTeacher] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  const navigate = useNavigate();
  const { teachers } = useContext(AppContext);
  const applyfilter = () => {
    if (speciality) {
      setFilterTeacher(
        teachers.filter((teachers) => teachers.speciality === speciality)
        
      );
    } else {
      setFilterTeacher(teachers);
    }
  };

  useEffect(() => {
    applyfilter();
  }, [teachers,speciality]);

  useEffect(() => {
    // Log the specialities for debugging
    console.log("Teacher specialities:", teachers.map(t => `"${t.speciality}"`));
  }, [teachers]);

  return (
    <div>
      <p className="font-semibold">Browse through the teachers specialist</p>
      <div className=" sm:flex-row  gap-5 mt-5">
        <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
            showFilter ? "bg-cyan-900 text-white" : " "
          }`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          Filters
        </button>
        <div
          className={` flex-col gap-4 text-sm text-black bg-white sm:text-white sm:bg-cyan-900 h-80 rounded-xl items-center cursor-pointer ${
            showFilter ? "flex" : "hidden sm:flex"
          }`}
        >
          <p
            onClick={() =>
              speciality === "Physics"
                ? navigate("/teachers")
                : navigate("/teachers/Physics")
            }
            className={`w-60 sm:w-96 mt-5 py-1.5 pr-16 border  border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Physics" ?  "bg-cyan-600" : ""
            }`}
           

          >
            Physics
          </p>
          <p
            onClick={() =>
              speciality === "Chemistry"
                ? navigate("/teachers")
                : navigate("/teachers/Chemistry")
            }
            className={`w-60 sm:w-96 pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Chemistry" ? "bg-cyan-600 " : ""
            }`}
          >
            Chemistry
          </p>
          <p
            onClick={() =>
              speciality === "Maths"
                ? navigate("/teachers")
                : navigate("/teachers/Maths")
            }
            className={`w-60 sm:w-96 pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Maths" ? "bg-cyan-600 " : ""
            }`}
          >
            Maths
          </p>
          <p
            onClick={() =>
              speciality === "Biology"
                ? navigate("/teachers")
                : navigate("/teachers/Biology")
            }
            className={`w-60 sm:w-96 pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Biology" ? "bg-cyan-600 " : ""
            }`}
          >
            Biology
          </p>
          <p
            onClick={() =>
              speciality === "English"
                ? navigate("/teachers")
                : navigate("/teachers/English")
            }
            className={`w-60 sm:w-96 pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "English" ? "bg-cyan-600 " : ""
            }`}
          >
            English
          </p>
          <p
            onClick={() =>
              speciality === "Hindi"
                ? navigate("/teachers")
                : navigate("/teachers/Hindi")
            }
            className={`w-60 sm:w-96 pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Hindi" ? "bg-cyan-600 " : ""
            }`}
          >
            Hindi
          </p>
        </div>
        <div className="w-full grid grid-cols-auto gap-4 gap-y-6 mt-5">
          {filterTeacher.map((item, index) => (
            <div
              onClick={() => navigate(`/appointment/${item._id}`)}
              key={index}
              className=" border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all  duration-500"
            >
              <img className="rounded-xl h-48 w-96" src={item.image} alt="" />
              <div className="p-4">
                <div
                  className={`flex  gap-2 text-sm text-center ${
                    item.available ? "text-green-500" : "text-red-500"
                  }  `}
                >
                  <p
                    className={`w-2 h-2 ${
                      item.available ? "bg-green-500" : "bg-red-500"
                    } rounded-full`}
                  ></p>
                  <p>{item.available ? "Available" : "Not available"}</p>
                </div>
                <p className="text-left text-gray-900 text-lg font-medium">
                  {item.name}
                </p>
                <p className="text-left text-gray-600 text-sm">
                  {item.speciality}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Teachers;

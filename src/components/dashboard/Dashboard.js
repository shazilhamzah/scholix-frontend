import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import SemesterContext from "../../context/semester/SemesterContext";
import ExamContext from "src/context/exam/ExamContext";

export const Dashboard = () => {
  // STATES
  const [date, setDate] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();

  const [excluding, setExcluding] = useState();
  const [including, setIncluding] = useState();

  const [activeSGPA,setActiveSGPA] = useState();
  let [checkActive,setCheckActive] = useState(false);


  // CONTEXTS
  const semesterContext = useContext(SemesterContext);
  const { active,semesters,getSemesters,user,getUser } = semesterContext;
  
  const examContext = useContext(ExamContext);


  // SETTING DATE + GETTING SEMESTERS
  const s = useNavigate();
  useEffect(() => {
    if(localStorage.getItem("token")){
      const month = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const d = new Date();
      let name = month[d.getMonth()];
      let date = d.getDate();
      let year = d.getFullYear();
      setDate(date);
      setMonth(name);
      setYear(year);
      getUser();
    }
    else{
      s("/login")
    }
  },[]);

  // SETTING EXCLUDING AND INCLUDING CGPA'S
  useEffect(() => {
    if (semesters.length > 0) {
      let x = 0;
      let y = 0;
      let isActiveFound = false;
      for (let index = 0; index < semesters.length; index++) {
        const element = semesters[index];
        if(element.active){
          setCheckActive(true);
          setActiveSGPA(element.sgpa) 
        }
        if (!element.active) {
          x += Number(element.sgpa);
        }
        y += Number(element.sgpa);
      }
      if (semesters.length > 1) {
        if(checkActive){
          setExcluding((x / (semesters.length-1)).toFixed(3));
        }
        else{
          setExcluding((x / (semesters.length)).toFixed(3));
        }
      }
      setIncluding((y / semesters.length).toFixed(3));
    }
  }, [semesters, active, getSemesters]);
  
  
  return (
    <>
      <div className="p-4 sm:ml-64 rounded-md">

        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          {/* NAME BLOCK */}
          <div
            className="flex h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800"
            style={{ backgroundColor: "#925FE2" }}
          >
            <div className="flex row mx-5 my-4">
              <p
                className="text-2xl text-white dark:text-gray-500"
                style={{
                  fontSize: 18.42,
                  fontFamily: "poppins",
                }}
              >
                {`${month} ${date}, ${year}`}
              </p>
              <div>
                <h3 className="text-white text-3xl font-bold">
                  {user?`Welcome, ${user.name}`:"-"}
                </h3>
                <p className="text-white text-1xl">
                  Always stay updated on your student portal
                </p>
              </div>
            </div>
          </div>

          {/* STATS BLOCK */}
          <h1 className="font-bold text-3xl mx-1 my-2">Current Stats</h1>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div
              className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800"
              style={{ backgroundColor: "#363946" }}
            >
              <div className="text-center">
                <span className="text-sm text-white">
                  CGPA excluding active semester
                </span>
                <br />
                {(excluding>=0&&excluding<=10) ? (
                  <span className="text-3xl font-bold text-white">
                    {excluding}
                  </span>
                ) : (
                  <span className="text-3xl font-bold text-white">-</span>
                )}
              </div>
            </div>
            <div
              className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800"
              style={{ backgroundColor: "#DA611E" }}
            >
              <div className="text-center">
                <span className="text-sm text-white">
                  CGPA including active semester
                </span>
                <br />
                {(including>=0&&including<=10) ? (
                  <span className="text-3xl font-bold text-white">
                    {including}
                  </span>
                ) : (
                  <span className="text-3xl font-bold text-white">-</span>
                )}
              </div>
            </div>
            <div
              className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800"
              style={{ backgroundColor: "#606C5D" }}
            >
              <div className="text-center">
                <span className="text-sm text-white">Active semester SGPA</span>
                <br />
                {(active&&active.sgpa>=0) ? (
                  <span className="text-3xl font-bold text-white">
                    {activeSGPA}
                  </span>
                ) : (
                  <span className="text-3xl font-bold text-white">-</span>
                )}
              </div>
            </div>
          </div>
          {/* <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
              <svg
                className="w-3.5 h-3.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
              <svg
                className="w-3.5 h-3.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div> */}
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

import SemesterContext from "../../context/semester/SemesterContext";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SubjectContext from "../../context/subject/SubjectContext";
import SubjectTable from "../semester/SubjectTable";
import { useNavigate } from "react-router-dom";

export const Semester = () => {
  const context = useContext(SemesterContext);
  const { semesters,active, getSemesters, setActiveSemester } = context;

  const subjectContext = useContext(SubjectContext);
  const { subjects, getSubjects } = subjectContext;

  const [semester, setSemester] = useState({});

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [yesAdded, setYesAdded] = useState(false);
  const refresh = () => window.location.reload(true)

  useEffect(() => {
    const fetchData = async () => {
      await getSemesters();
    };

    fetchData();
  }, [getSemesters]);

  useEffect(() => {
    if (semesters.length > 0 && !yesAdded) {
      for (let index = 0; index < semesters.length; index++) {
        const element = semesters[index];
        if(element.active){
          setSemester(element);
        getSubjects(element._id);
        setYesAdded(true);
        break
        }
      }
    }
  }, [semesters, active, yesAdded, getSubjects,getSemesters]);

const onClick = (semester) => {
    setSemester(semester);
    setDropdownOpen(false);
    getSubjects(semester._id);
  };

  const activeBtnClicked = async () => {
    await setActiveSemester(semester._id);
    await getSemesters();
    const updatedActive = semesters.find(sem => sem._id === semester._id);
    if (updatedActive) {
      setSemester(updatedActive);
      getSubjects(updatedActive._id);
    }
    refresh();
  };

  return (
    <>
      <div className="p-4 sm:ml-64">
        <div
          className="upper-row flex justify-between items-center"
          style={{ marginBottom: 10 }}
        >
          <h1 className="text-5xl font-extrabold dark:text-white">
            {semester.name}
          </h1>
          <div className="relative">
            <div>
              {!semester.active&&
                <button
                type="button"
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                onClick={activeBtnClicked}
              >
                Set semester as active
              </button>}
              

              <button
                id="dropdownDefaultButton"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
              >
                Semesters
                <svg
                  className="w-2.5 h-2.5 ml-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
            </div>
            {dropdownOpen && (
              <div
                id="dropdown"
                className="absolute right-0 z-10 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700"
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownDefaultButton"
                >
                  {semesters.map((semester) => (
                    <li key={semester._id}>
                      <Link
                        to="/semesters"
                        onClick={() => onClick(semester)}
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        {semester.name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      to="/addsemester"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Add Semester
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div style={{ marginTop: 30 }}>
          <SubjectTable subjects={subjects} />
        </div>
      </div>
    </>
  );
};

// export const Semester = () => {

//   // const context = useContext(SemesterContext);
//   // const { semesters, getSemesters } = context;

//   // const [semester,setSemester] = useState({id:"",name:"",sgpa:""})
//   // useEffect(() => {
//   //   getSemesters();
//   // }, []);

//     // const onClick=()=>{console.log("add")}
//     return (
//         <>
//       <div className="p-4 sm:ml-64">
//         <h1 className="text-5xl font-extrabold dark:text-white" style={{marginBottom:10}}>Semesters</h1>
//         {semesters.map((semester) => (
//           <SemesterItem key={semester.id} semester={semester} />
//         ))}

//         {/* //? THIS DIV IS FOR ADDING A NEW SEMESTER*/}
//         <Link to="/addsemester">
//         <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
//           <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
//             <p className="text-2xl text-gray-400 dark:text-gray-500">
//               <svg
//                 className="w-3.5 h-3.5"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 18 18"
//               >
//                 <path
//                   stroke="currentColor"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                   stroke-width="2"
//                   d="M9 1v16M1 9h16"
//                 />
//               </svg>
//             </p>
//           </div>
//         </div>
//         </Link>

//         {/* //? THIS DIV ENDS HERE */ }

//       </div>
//       </>
//     );
//   };

// export const Semester = () => {
//   return (
//     <div className="p-4 sm:ml-64">
//       <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
//         {/* <div className="grid grid-cols-3 gap-4 mb-4">
//           <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
//             <p className="text-2xl text-gray-400 dark:text-gray-500">
//               <svg
//                 className="w-3.5 h-3.5"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 18 18"
//               >
//                 <path
//                   stroke="currentColor"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                   stroke-width="2"
//                   d="M9 1v16M1 9h16"
//                 />
//               </svg>
//             </p>
//           </div>
//           <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
//             <p className="text-2xl text-gray-400 dark:text-gray-500">
//               <svg
//                 className="w-3.5 h-3.5"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 18 18"
//               >
//                 <path
//                   stroke="currentColor"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                   stroke-width="2"
//                   d="M9 1v16M1 9h16"
//                 />
//               </svg>
//             </p>
//           </div>
//           <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
//             <p className="text-2xl text-gray-400 dark:text-gray-500">
//               <svg
//                 className="w-3.5 h-3.5"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 18 18"
//               >
//                 <path
//                   stroke="currentColor"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                   stroke-width="2"
//                   d="M9 1v16M1 9h16"
//                 />
//               </svg>
//             </p>
//           </div>
//         </div> */}
//         <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
//           <p className="text-2xl text-gray-400 dark:text-gray-500">
//             <svg
//               className="w-3.5 h-3.5"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 18 18"
//             >
//               <path
//                 stroke="currentColor"
//                 stroke-linecap="round"
//                 stroke-linejoin="round"
//                 stroke-width="2"
//                 d="M9 1v16M1 9h16"
//               />
//             </svg>
//           </p>
//         </div>
//         {/* <div className="grid grid-cols-2 gap-4 mb-4">
//           <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
//             <p className="text-2xl text-gray-400 dark:text-gray-500">
//               <svg
//                 className="w-3.5 h-3.5"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 18 18"
//               >
//                 <path
//                   stroke="currentColor"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                   stroke-width="2"
//                   d="M9 1v16M1 9h16"
//                 />
//               </svg>
//             </p>
//           </div>
//           <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
//             <p className="text-2xl text-gray-400 dark:text-gray-500">
//               <svg
//                 className="w-3.5 h-3.5"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 18 18"
//               >
//                 <path
//                   stroke="currentColor"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                   stroke-width="2"
//                   d="M9 1v16M1 9h16"
//                 />
//               </svg>
//             </p>
//           </div>
//           <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
//             <p className="text-2xl text-gray-400 dark:text-gray-500">
//               <svg
//                 className="w-3.5 h-3.5"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 18 18"
//               >
//                 <path
//                   stroke="currentColor"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                   stroke-width="2"
//                   d="M9 1v16M1 9h16"
//                 />
//               </svg>
//             </p>
//           </div>
//           <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
//             <p className="text-2xl text-gray-400 dark:text-gray-500">
//               <svg
//                 className="w-3.5 h-3.5"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 18 18"
//               >
//                 <path
//                   stroke="currentColor"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                   stroke-width="2"
//                   d="M9 1v16M1 9h16"
//                 />
//               </svg>
//             </p>
//           </div>
//         </div>
//         <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
//           <p className="text-2xl text-gray-400 dark:text-gray-500">
//             <svg
//               className="w-3.5 h-3.5"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 18 18"
//             >
//               <path
//                 stroke="currentColor"
//                 stroke-linecap="round"
//                 stroke-linejoin="round"
//                 stroke-width="2"
//                 d="M9 1v16M1 9h16"
//               />
//             </svg>
//           </p>
//         </div>
//         <div className="grid grid-cols-2 gap-4">
//           <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
//             <p className="text-2xl text-gray-400 dark:text-gray-500">
//               <svg
//                 className="w-3.5 h-3.5"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 18 18"
//               >
//                 <path
//                   stroke="currentColor"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                   stroke-width="2"
//                   d="M9 1v16M1 9h16"
//                 />
//               </svg>
//             </p>
//           </div>
//           <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
//             <p className="text-2xl text-gray-400 dark:text-gray-500">
//               <svg
//                 className="w-3.5 h-3.5"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 18 18"
//               >
//                 <path
//                   stroke="currentColor"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                   stroke-width="2"
//                   d="M9 1v16M1 9h16"
//                 />
//               </svg>
//             </p>
//           </div>
//           <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
//             <p className="text-2xl text-gray-400 dark:text-gray-500">
//               <svg
//                 className="w-3.5 h-3.5"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 18 18"
//               >
//                 <path
//                   stroke="currentColor"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                   stroke-width="2"
//                   d="M9 1v16M1 9h16"
//                 />
//               </svg>
//             </p>
//           </div>
//           <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
//             <p className="text-2xl text-gray-400 dark:text-gray-500">
//               <svg
//                 className="w-3.5 h-3.5"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 18 18"
//               >
//                 <path
//                   stroke="currentColor"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                   stroke-width="2"
//                   d="M9 1v16M1 9h16"
//                 />
//               </svg>
//             </p>
//           </div>
//         </div> */}
//       </div>
//     </div>
//   );
// };

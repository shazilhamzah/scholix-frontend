import SemesterContext from "../../context/semester/SemesterContext";
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SubjectContext from "../../context/subject/SubjectContext";
import SubjectTable from "../semester/SubjectTable";
import Swal from "sweetalert2";

// export const Semester = () => {
//   const context = useContext(SemesterContext);
//   const { semesters, active, getSemesters, setActiveSemester, deleteSemester } =
//     context;

//   const subjectContext = useContext(SubjectContext);
//   const { subjects = [], getSubjects } = subjectContext; // Default to empty array

//   const [semester, setSemester] = useState({});
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [yesAdded, setYesAdded] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!localStorage.getItem("token")) {
//       navigate("/login");
//     }
//   }, [navigate]);

//   useEffect(() => {
//     const fetchData = async () => {
//       await getSemesters();
//     };
//     fetchData();
//   }, [getSemesters]);

//   useEffect(() => {
//     if (semesters.length > 0 && !yesAdded) {
//       for (let index = 0; index < semesters.length; index++) {
//         const element = semesters[index];
//         if (element.active) {
//           setSemester(element);
//           getSubjects(element._id);
//           setYesAdded(true);
//           break;
//         }
//       }
//       if (!yesAdded) {
//         setSemester(semesters[0]);
//       }
//     }
//   }, [semesters, yesAdded, getSubjects]);

//   const refresh = () => {
//     window.location.reload(true);
//   };

//   const onClick = (semester) => {
//     setSemester(semester);
//     setDropdownOpen(false);
//     getSubjects(semester._id);
//   };

//   const activeBtnClicked = async () => {
//     await setActiveSemester(semester._id);
//     await getSemesters();
//     const updatedActive = semesters.find((sem) => sem._id === semester._id);
//     if (updatedActive) {
//       setSemester(updatedActive);
//       getSubjects(updatedActive._id);
//     }
//     refresh();
//   };

//   const onClickDelete = async () => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         deleteSemester(semester._id);
//         Swal.fire({
//           title: "Deleted!",
//           text: "Your file has been deleted.",
//           icon: "success",
//         });
//         refresh();
//       }
//     });
//   };

//   return (
//     <>
//       <div className="p-4 sm:ml-64">
//         <div
//           className="upper-row flex justify-between items-center"
//           style={{ marginBottom: 10 }}
//         >
//           {semesters.length > 0 ? (
//             <h1 className="text-5xl font-extrabold dark:text-white">
//               {semester.name}
//             </h1>
//           ) : (
//             <h1 className="text-5xl font-extrabold dark:text-white">
//               No semesters found.
//             </h1>
//           )}
//           <div className="relative">
//             <div>
//               {!semester.active && semesters.length > 0 && (
//                 <button
//                   type="button"
//                   className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
//                   onClick={activeBtnClicked}
//                 >
//                   Set semester as active
//                 </button>
//               )}
//               {semesters.length === 0 ? (
//                 <p></p>
//               ) : (
//                 <button
//                   type="button"
//                   className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
//                   onClick={onClickDelete}
//                 >
//                   Delete Semester
//                 </button>
//               )}

//               <button
//                 id="dropdownDefaultButton"
//                 onClick={() => setDropdownOpen(!dropdownOpen)}
//                 className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                 type="button"
//               >
//                 Semesters
//                 <svg
//                   className="w-2.5 h-2.5 ml-2.5"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 10 6"
//                 >
//                   <path
//                     stroke="currentColor"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="m1 1 4 4 4-4"
//                   />
//                 </svg>
//               </button>
//             </div>
//             {dropdownOpen && (
//               <div
//                 id="dropdown"
//                 className="absolute right-0 z-10 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700"
//               >
//                 <ul
//                   className="py-2 text-sm text-gray-700 dark:text-gray-200"
//                   aria-labelledby="dropdownDefaultButton"
//                 >
//                   {semesters.map((semester) => (
//                     <li key={semester._id}>
//                       <Link
//                         to="/semesters"
//                         onClick={() => onClick(semester)}
//                         className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//                       >
//                         {semester.name}
//                       </Link>
//                     </li>
//                   ))}
//                   <li>
//                     <Link
//                       to="/addsemester"
//                       className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//                     >
//                       Add Semester
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>
//         <div style={{ marginTop: 30 }}>
//           {subjects.length > 0 ? (
//             <SubjectTable subjects={subjects} />
//           ) : (
//             <p>No subjects available.</p>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Semester;
export const Semester = () => {
  const context = useContext(SemesterContext);
  const { semesters, getSemesters, setActiveSemester, deleteSemester } =
    context;

  const subjectContext = useContext(SubjectContext);
  const { subjects = [], getSubjects } = subjectContext;

  const [semester, setSemester] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [manualSelection, setManualSelection] = useState(false); // Track manual selection
  const [hasFetchedSubjects, setHasFetchedSubjects] = useState(false); // fetching subject true and false
  let [trash, setTrash] = useState(0);
  const navigate = useNavigate();

  // Fetch semesters and subjects when the component mounts
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    const fetchData = async () => {
      await getSemesters();
    };
    fetchData();
  }, [navigate, getSemesters]);

  const refresh = () => {
    window.location.reload(true);
  };

  // Set the active semester when the semesters are fetched, but only if no manual selection has been made
  useEffect(() => {
    if (semesters.length > 0 && !manualSelection) {
      const activeSemester = semesters.find((sem) => sem.active);
      if (activeSemester) {
        setSemester(activeSemester);
      } else {
        setSemester(semesters[0]);
      }
    }
  }, [semesters, manualSelection, hasFetchedSubjects]);

  useEffect(() => {
    if (semesters.length > 0) {
      const activeSemester = semesters.find((sem) => sem.active);
      if (activeSemester && !hasFetchedSubjects) {
        getSubjects(activeSemester._id);
        // setHasFetchedSubjects(true);
      } else {
        getSubjects(semesters[0]._id);
        // setHasFetchedSubjects(true);
      }
    }
  }, [semesters, hasFetchedSubjects]);

  // Handle semester selection
  const onClick = (selectedSemester) => {
    setSemester(selectedSemester);
    setDropdownOpen(false);
    setManualSelection(true); // Mark as manually selected
    getSubjects(selectedSemester._id);
  };

  const activeBtnClicked = async () => {
    await setActiveSemester(semester._id); // Set the semester as active
    await getSemesters(); // Refresh the list of semesters
    const updatedActive = semesters.find((sem) => sem._id === semester._id);
    if (updatedActive) {
      setSemester(updatedActive);
      getSubjects(updatedActive._id);
    }
    refresh();
  };

  const onClickDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSemester(semester._id); // Delete the selected semester
        Swal.fire({
          title: "Deleted!",
          text: "Your semester has been deleted.",
          icon: "success",
        });
        getSemesters();
        refresh();
      }
    });
  };

  return (
    <>
      <div className="p-4 sm:ml-64">
        <div
          className="upper-row flex justify-between items-center"
          style={{ marginBottom: 10 }}
        >
          {semesters.length > 0 ? (
            <h1 className="text-5xl font-extrabold dark:text-white">
              {semester.name}
            </h1>
          ) : (
            <h1 className="text-5xl font-extrabold dark:text-white">
              No semesters found.
            </h1>
          )}
          <div className="relative">
            <div>
              {!semester.active && semesters.length > 0 && (
                <button
                  type="button"
                  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  onClick={activeBtnClicked}
                >
                  Set semester as active
                </button>
              )}
              {semesters.length === 0 ? (
                <p></p>
              ) : (
                <button
                  type="button"
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  onClick={onClickDelete}
                >
                  Delete Semester
                </button>
              )}

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
          {subjects.length > 0 ? (
            <SubjectTable subjects={subjects} />
          ) : (
            <p>No subjects available.</p>
          )}
        </div>
      </div>
    </>
  );
};

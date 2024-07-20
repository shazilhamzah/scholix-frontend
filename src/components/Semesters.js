import { SemesterItem } from "./SemesterItem";
import SemesterContext from "../context/semester/SemesterContext";
import { useContext, useState } from "react";
import { useEffect } from "react";


export const Semester = () => {

  const context = useContext(SemesterContext);
  const { semesters, getSemesters } = context;

  const [semester,setSemester] = useState({id:"",name:"",sgpa:""})
  useEffect(() => {
    getSemesters();
  }, []);

    const onClick=()=>{console.log("add")}
    return (
        <>
      <div class="p-4 sm:ml-64">
        <h1 className="text-5xl font-extrabold dark:text-white" style={{marginBottom:10}}>Semesters</h1>
        {semesters.map((semester) => (
          <SemesterItem key={semester.id} semester={semester} />
        ))}


        {/* //? THIS DIV IS FOR ADDING A NEW SEMESTER*/}

        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700" onClick={onClick}>
          <div class="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
            <p class="text-2xl text-gray-400 dark:text-gray-500">
              <svg
                class="w-3.5 h-3.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </p>
          </div>
        </div>


        {/* //? THIS DIV ENDS HERE */ }


      </div>
      </>
    );
  };
  

// export const Semester = () => {
//   return (
//     <div class="p-4 sm:ml-64">
//       <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
//         {/* <div class="grid grid-cols-3 gap-4 mb-4">
//           <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
//             <p class="text-2xl text-gray-400 dark:text-gray-500">
//               <svg
//                 class="w-3.5 h-3.5"
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
//           <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
//             <p class="text-2xl text-gray-400 dark:text-gray-500">
//               <svg
//                 class="w-3.5 h-3.5"
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
//           <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
//             <p class="text-2xl text-gray-400 dark:text-gray-500">
//               <svg
//                 class="w-3.5 h-3.5"
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
//         <div class="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
//           <p class="text-2xl text-gray-400 dark:text-gray-500">
//             <svg
//               class="w-3.5 h-3.5"
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
//         {/* <div class="grid grid-cols-2 gap-4 mb-4">
//           <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
//             <p class="text-2xl text-gray-400 dark:text-gray-500">
//               <svg
//                 class="w-3.5 h-3.5"
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
//           <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
//             <p class="text-2xl text-gray-400 dark:text-gray-500">
//               <svg
//                 class="w-3.5 h-3.5"
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
//           <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
//             <p class="text-2xl text-gray-400 dark:text-gray-500">
//               <svg
//                 class="w-3.5 h-3.5"
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
//           <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
//             <p class="text-2xl text-gray-400 dark:text-gray-500">
//               <svg
//                 class="w-3.5 h-3.5"
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
//         <div class="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
//           <p class="text-2xl text-gray-400 dark:text-gray-500">
//             <svg
//               class="w-3.5 h-3.5"
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
//         <div class="grid grid-cols-2 gap-4">
//           <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
//             <p class="text-2xl text-gray-400 dark:text-gray-500">
//               <svg
//                 class="w-3.5 h-3.5"
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
//           <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
//             <p class="text-2xl text-gray-400 dark:text-gray-500">
//               <svg
//                 class="w-3.5 h-3.5"
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
//           <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
//             <p class="text-2xl text-gray-400 dark:text-gray-500">
//               <svg
//                 class="w-3.5 h-3.5"
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
//           <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
//             <p class="text-2xl text-gray-400 dark:text-gray-500">
//               <svg
//                 class="w-3.5 h-3.5"
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

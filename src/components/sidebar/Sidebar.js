import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      closeSidebar();
    }
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  const logoutClick = () => {
    localStorage.setItem("token", "");
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        aria-controls="logo-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="logo-sidebar"
        ref={sidebarRef}
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform  ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 sm:block bg-gray-50 dark:bg-gray-800`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center ps-2.5 mb-5">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="h-6 mr-3 sm:h-7"
                alt="Flowbite Logo"
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                Scholix
              </span>
            </Link>
          </div>
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/dashboard"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ml-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/semesters"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Semesters</span>
              </Link>
            </li>
            <li>
              <Link
                to="/subjects"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 20"
                >
                  <path d="M16 14V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 0 0 0-2h-1v-2a2 2 0 0 0 2-2ZM4 2h2v12H4V2Zm8 16H3a1 1 0 0 1 0-2h9v2Z" />
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Subjects</span>
              </Link>
            </li>
            {/* <li>
              <Link
                to="/users"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
              </Link>
            </li> */}
            <hr />
            <li>
              <Link
                onClick={logoutClick}
                to="/login"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="w-6 h-6 text-gray-500 dark:text-white group-hover:text-gray-900 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"
                  />
                </svg>

                <span className="flex-1 ml-3 whitespace-nowrap">Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

// "use client";
// import React, { useState } from "react";
// import { SidebarBody, SidebarLink, SidebarNew } from "./SidebarNew";
// import {
//   IconArrowLeft,
//   IconBrandTabler,
//   IconSettings,
//   IconUserBolt,
//   IconBook,
// } from "@tabler/icons-react";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { cn } from "src/lib/utils";
// import { Image } from "lucide-react";

// export function Sidebar() {
//   const links = [
//     {
//       label: "Dashboard",
//       href: "/dashboard",
//       icon: (
//         <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
//       ),
//     },
//     {
//       label: "Semesters",
//       href: "/semesters",
//       icon: (
//         <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
//       ),
//     },
//     {
//       label: "Subjects",
//       href: "/subjects",
//       icon: (
//         <IconBook className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
//       ),
//     },
//     {
//       label: "Logout",
//       href: "#",
//       icon: (
//         <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
//       ),
//     },
//   ];
//   const [open, setOpen] = useState(false);

//   return (
//     <div>
//       <div
//         className={cn(
//           "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 lex-1 max-w-7xl mx-auto dark:border-neutral-700 overflow-hidden",
//           "h-screen" // for your use case, use `h-screen` instead of `h-[60vh]`
//         )}
//         style={{position:"fixed"}}
//       >
//         <SidebarNew open={open} setOpen={setOpen}>
//           <SidebarBody className="justify-between gap-10">
//             <div className="flex flex-col flex-1">
//               {open ? <Logo /> : <LogoIcon />}
//               <div className="mt-8 flex flex-col gap-2">
//                 {links.map((link, idx) => (
//                   <SidebarLink key={idx} link={link} />
//                 ))}
//               </div>
//             </div>
//             <div>
//               {/* <SidebarLink
//                 link={{
//                   label: "Manu Arora",
//                   href: "#",
//                   icon: (
//                     <Image
//                       src="https://assets.aceternity.com/manu.png"
//                       className="h-7 w-7 flex-shrink-0 rounded-full"
//                       width={50}
//                       height={50}
//                       alt="Avatar"
//                     />
//                   ),
//                 }}
//               /> */}
//             </div>
//           </SidebarBody>
//       {/* <NewDashboard /> */}
//         </SidebarNew>
//       </div>
//     </div>
//   );
// }

// export const Logo = () => {
//   return (
//     <Link
//       href="#"
//       className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
//     >
//       <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
//       <motion.span
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="font-medium text-black dark:text-white whitespace-pre"
//       >
//         Scholix
//       </motion.span>
//     </Link>
//   );
// };

// export const LogoIcon = () => {
//   return (
//     <Link
//       href="#"
//       className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
//     >
//       <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
//     </Link>
//   );
// };

// // Dummy dashboard component with content
// export const NewDashboard = () => {
//   return (
//     <div className="flex flex-1">
//       <div className="p-2 md:p-10 rounded-tl-2xl dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 h-full" >
//           {/* <div className="flex gap-2">
//             {[...new Array(4)].map((i) => (
//               <div
//                 key={"first-array" + i}
//                 className="h-20 w-full rounded-lg bg-gray-100 dark:bg-neutral-800 animate-pulse"
//               ></div>
//             ))}
//           </div>
//           <div className="flex gap-2 flex-1">
//             {[...new Array(2)].map((i) => (
//               <div
//                 key={"second-array" + i}
//                 className="h-full w-full rounded-lg bg-gray-100 dark:bg-neutral-800 animate-pulse"
//               ></div>
//             ))}
//           </div> */}
//       </div>
//     </div>
//   );
// };

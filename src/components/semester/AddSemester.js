import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import React from "react";
import SemesterContext from "../../context/semester/SemesterContext";

export const AddSemester = () => {
  const context = useContext(SemesterContext);
  const {addSemester} = context;
  const [semesterInput, setSemesterInput] = useState("");
  const [sgpaInput, setsgpaInput] = useState();
  const onClick = async () => {
      const a = await addSemester(semesterInput,sgpaInput);
      console.log(a);
  };

  const onChangeSemester = (event) => {
    setSemesterInput(event.target.value);
  };
  
  const onChangeSGPA = (event) => {
    setsgpaInput(event.target.value);
  };


  return (
    <>
      <div className="p-4 sm:ml-64">

        {/*  FIRST ROW: DROPDOWN + HEADING  */}

        <h1
          className="text-5xl font-extrabold dark:text-white"
          style={{ marginBottom: 20 }}
        >
          Add Semester
        </h1>
        <form className="mx-auto max-w-sm align-center mt-5">
          <div className="mb-3">
            <label
              htmlFor="semester"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Semester name
            </label>
            <input
              type="text"
              id="semester"
              name="semester"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              value={semesterInput}
              onChange={onChangeSemester}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="sgpa"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              SGPA{" "}
            </label>
            <input
              type="number"
              step="any"
              id="sgpa"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={sgpaInput}
              onChange={onChangeSGPA}
            />
          </div>
          <Link
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={onClick}
            to="/semesters"
          >
            Add
          </Link>
        </form>

        {/*  FIRST ROW END  */}

      </div>
    </>
  );
};

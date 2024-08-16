import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import React from "react";
import SemesterContext from "../../context/semester/SemesterContext";
import Swal from "sweetalert2";

export const AddSemester = () => {
  const context = useContext(SemesterContext);
  const { addSemester } = context;
  const [semesterInput, setSemesterInput] = useState("");
  const [sgpaInput, setsgpaInput] = useState();
  const onClick = async () => {
    const a = await addSemester(semesterInput, sgpaInput);
  };

  const onChangeSemester = (event) => {
    setSemesterInput(event.target.value);
  };

  const onChangeSGPA = (event) => {
    setsgpaInput(event.target.value);
  };

  const alert = (isSuccess) => {
    if (isSuccess) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Semester added successfully.",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error adding semester!",
      });
    }
  };
  
  const onClickWrong = () => {
    alert(false);
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
            <div className="flex gap-2">
              <label
                htmlFor="semester"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Semester name
              </label>
              <span className="block text-sm font-medium text-red-700 dark:text-white italic">
                *Required
              </span>
            </div>
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
          {semesterInput && semesterInput.length >= 2 ? (
            <Link
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={onClick}
              to="/semesters"
            >
              <button style={{ margin: 0 }}>Add</button>
            </Link>
          ) : (
            <Link
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 opacity-50"
              onClick={onClickWrong}
            >
              Add
            </Link>
          )}
        </form>

        {/*  FIRST ROW END  */}
      </div>
    </>
  );
};

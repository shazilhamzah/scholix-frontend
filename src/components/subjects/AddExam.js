import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import React from "react";
import SemesterContext from "../../context/semester/SemesterContext";
import SubjectContext from "../../context/subject/SubjectContext";

export const AddExam = () => {
  const context = useContext(SubjectContext);
  const {addSubject} = context;
  const semcontext = useContext(SemesterContext);
  const {active} = semcontext;

  const [subjectInput, setsubjectInput] = useState("");
  const [creditHrsInput, setcreditHrsInput] = useState("");
  const [subejctTypeInput, setSubejctTypeInput] = useState("");
  const [gradingTypeInput, setGradingTypeInput] = useState("Select Grading Type");
  const [gradeInput, setGradeInput] = useState("");
  const [teacherNameInput, setteacherNameInput] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const onClick = async () => {
    console.log("Teacher Name Input:", teacherNameInput);
    const a = await addSubject(active._id, subjectInput,creditHrsInput,subejctTypeInput,gradingTypeInput,gradeInput,teacherNameInput);
  };  

  const onChangeSubject = (event) => {
    setsubjectInput(event.target.value);
  };

  const onChangeCH = (event) => {
    setcreditHrsInput(event.target.value);
  };

  const onChangeSubejctType = (event) => {
    setSubejctTypeInput(event.target.value);
  };

  const onChangeGrade = (event) => {
    setGradeInput(event.target.value);
  };
  
  const onChangeTeacher = (event) => {
    setteacherNameInput(event.target.value);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const gradingTypeInputFunction = (s) => () => {
    if (s === "Relative" || s === "Absolute") {
      setGradingTypeInput(s);
      setDropdownOpen(false);
    }
  };

  return (
    <>
      <div className="p-4 sm:ml-64">
        <h1
          className="text-5xl font-extrabold dark:text-white"
          style={{ marginBottom: 20 }}
        >
          Add Subject
        </h1>
        <form className="mx-auto max-w-sm align-center mt-5">
          <div className="mb-3">
            <div className="flex gap-2">
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Subject name
            </label>
            <span className="block text-sm font-medium text-red-700 dark:text-white italic">*Required</span>
            </div>
            <input
              type="text"
              id="subject"
              name="subject"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              value={subjectInput}
              onChange={onChangeSubject}
            />
          </div>
          <div className="mb-4">
            <div className="flex gap-2">
            <label
              htmlFor="credithrs"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Credit Hrs.{" "}
            </label>
            <span className="block text-sm font-medium text-red-700 dark:text-white italic">*Required</span>
            </div>
            <input
              type="number"
              id="credithrs"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={creditHrsInput}
              onChange={onChangeCH}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="subjectType"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Subject Type{" "}
            </label>
            <input
              type="text"
              id="subjectType"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={subejctTypeInput}
              onChange={onChangeSubejctType}
            />
          </div>
          <div className="mb-4">
            <div className="flex gap-2">
            <label
              htmlFor="grading"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Grading Type
            </label>
            <span className="block text-sm font-medium text-red-700 dark:text-white italic">*Required</span>
            </div>
            <button
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="button"
              onClick={toggleDropdown}
            >
              {gradingTypeInput}
            </button>
            {dropdownOpen && (
              <div
                id="dropdown"
                className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownDefaultButton"
                >
                  <li>
                    <button
                      type="button"
                      className="block px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={gradingTypeInputFunction("Relative")}
                    >
                      Relative
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="block px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={gradingTypeInputFunction("Absolute")}
                    >
                      Absolute
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="grade"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Grade
            </label>
            <input
              type="text"
              id="grade"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={gradeInput}
              onChange={onChangeGrade}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="teacher"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Teacher Name
            </label>
            <input
              type="text"
              id="teacher"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={teacherNameInput}
              onChange={onChangeTeacher}
            />
          </div>
          <Link
            to="/subjects"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={onClick}
          >
            Add
          </Link>
        </form>
      </div>
    </>
  );
};

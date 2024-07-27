import { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import SemesterContext from "../../context/semester/SemesterContext";
import ExamContext from "../../context/exam/ExamContext";

export const AddExam = () => {
  // STATES
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [examTypeInput, setExamTypeInput] = useState("Select Exam Type");
  const [totalMarksInput, setTotalMarksInput] = useState();
  const [obtainedMarksInput, setObtainedMarksInput] = useState();
  const [averageMarksInput, setAverageMarksInput] = useState();
  const [weightageInput, setWeightageInput] = useState();

  // CONTEXTS
  const semcontext = useContext(SemesterContext);
  const { active } = semcontext;
  const { addExam } = useContext(ExamContext);

  // Retrieve the subjectID from state
  const location = useLocation();
  const id = location.state;

  // FUNCTIONS
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const examTypeInputFunction = (s) => () => {
    if (
      s === "Assignment" ||
      s === "Final" ||
      s === "Project" ||
      s === "Quiz" ||
      s === "MidTerm" ||
      s === "Homework"
    ) {
      setExamTypeInput(s);
      setDropdownOpen(false);
    }
  };

  const onChangeTotalMarks = (event) => {
    setTotalMarksInput(event.target.value);
  };

  const onChangeObtainedMarks = (event) => {
    setObtainedMarksInput(event.target.value);
  };

  const onChangeAverageMarks = (event) => {
    setAverageMarksInput(event.target.value);
  };

  const onChangeWeightage = (event) => {
    setWeightageInput(event.target.value);
  };

  const navigate = useNavigate();
  const { type } = useParams();
  const onClick = async (event) => {
    console.log(active._id);
    console.log(id.id);
    const a = await addExam(
      active._id,
      id.id,
      type,
      totalMarksInput,
      obtainedMarksInput,
      averageMarksInput,
      weightageInput
    );
  };

  return (
    <>
      <div className="p-4 sm:ml-64">
        {/* HEADING - START */}

        <h1
          className="text-5xl font-extrabold dark:text-white"
          style={{ marginBottom: 20 }}
        >
          Add Exam
        </h1>

        <form className="mx-auto max-w-sm align-center mt-5">
          {/* EXAM TYPE - START

          <div className="mb-4">
            <div className="flex gap-2">
              <label
                htmlFor="examType"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Exam Type
              </label>
              <span className="block text-sm font-medium text-red-700 dark:text-white italic">
                *Required
              </span>
            </div>
            <button
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="button"
              onClick={toggleDropdown}
            >
              {examTypeInput}
            </button>
            {dropdownOpen && (
              <div
                id="data-dropdown-toggle"
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
                      onClick={examTypeInputFunction("Quiz")}
                    >
                      Quiz
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="block px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={examTypeInputFunction("MidTerm")}
                    >
                      MidTerm
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="block px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={examTypeInputFunction("Assignment")}
                    >
                      Assignment
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="block px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={examTypeInputFunction("Project")}
                    >
                      Project
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="block px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={examTypeInputFunction("Homework")}
                    >
                      Homework
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="block px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={examTypeInputFunction("Final")}
                    >
                      Final
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div> */}

          {/* TOTAL MARKS - START */}

          <div className="mb-4">
            <div className="flex gap-2">
              <label
                htmlFor="totalMarks"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Total Marks{" "}
              </label>
              <span className="block text-sm font-medium text-red-700 dark:text-white italic">
                *Required
              </span>
            </div>
            <input
              type="number"
              id="totalMarks"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={totalMarksInput}
              onChange={onChangeTotalMarks}
              required
            />
          </div>

          {/* OBTAINED MARKS - START */}

          <div className="mb-4">
            <div className="flex gap-2">
              <label
                htmlFor="obtainedMarks"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Obtained Marks{" "}
              </label>
              <span className="block text-sm font-medium text-red-700 dark:text-white italic">
                *Required
              </span>
            </div>
            <input
              type="number"
              id="obtainedMarks"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={obtainedMarksInput}
              onChange={onChangeObtainedMarks}
              required
            />
          </div>

          {/* AVERAGE MARKS - START */}

          <div className="mb-4">
            <div className="flex gap-2">
              <label
                htmlFor="averageMarks"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Average Marks{" "}
              </label>
              <span className="block text-sm font-medium text-red-700 dark:text-white italic">
                *Required
              </span>
            </div>
            <input
              type="number"
              id="averageMarks"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={averageMarksInput}
              onChange={onChangeAverageMarks}
              required
            />
          </div>

          {/* WEIGHTAGE - START */}

          <div className="mb-4">
            <div className="flex gap-2">
              <label
                htmlFor="averageMarks"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Weightage{" "}
              </label>
              <span className="block text-sm font-medium text-red-700 dark:text-white italic">
                *Required
              </span>
            </div>
            <input
              type="number"
              id="weightage"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={weightageInput}
              onChange={onChangeWeightage}
              required
            />
          </div>

          {/* ADD BUTTON - START */}
          <Link
            to="/subjects"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={onClick}
          >
            Add
          </Link>
        </form>
      </div>

      {/* <button onClick={SubjectDetail}>kjascb</button> */}
    </>
  );
};

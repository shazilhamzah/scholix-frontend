import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SemesterContext from "../../context/semester/SemesterContext";
import SubjectContext from "../../context/subject/SubjectContext";
import ExamContext from "../../context/exam/ExamContext";
import ExamTable from "./ExamTable";
import { Semester } from "../semester/Semesters";

const Subjects = () => {
  // CONTEXTS
  const semesterContext = useContext(SemesterContext);
  const { active } = semesterContext;

  const subjectContext = useContext(SubjectContext);
  const { subjects, getSubjects } = subjectContext;

  const examContext = useContext(ExamContext);
  const { exams, getExams } = examContext;

  // STATES

  const [subject, setSubject] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // const [allExams, setAllExams] = useState({});
  const [assignments, setAssignments] = useState([]);

  // EFFECTS

  useEffect(() => {
    const fetchData = async () => {
      if (active && active._id) {
        await getSubjects(active._id);
      }
    };
    fetchData();
  }, [active, getSubjects]);

  useEffect(() => {
    const fetchData = async () => {
      if (active && active._id && subject._id) {
        await getExams(active._id, subject._id);
      }
    };
    fetchData();
  }, [active, subject, getExams]);

  useEffect(() => {
    if (exams) {
      const assignmentExams = exams.filter(
        (exam) => exam.examType === "assignment"
      );
      setAssignments(assignmentExams);
    }
  }, [exams]);

  useEffect(() => {
    if (subjects.length > 0 && !subject._id) {
      setSubject(subjects[0]);
    }

  }, [subjects, subject]);

  // BUTTON FUNCTIONS

  const refresh = () => window.location.reload(true)
  const onClick = (subject) => {
    setSubject(subject);
    setDropdownOpen(false);
  };

  const addExamButton = (examType) => {
    // console.log(assignments);
  };

  return (
    <>
      {/* TOP HEADING + DROPDOWN FOR SUBJECTS */}
      <div className="p-4 sm:ml-64">
        <div
          className="upper-row flex justify-between items-center"
          style={{ marginBottom: 10 }}
        >
          <h1 className="text-5xl font-extrabold dark:text-white">
            {subject.name}
          </h1>
          <div className="relative">
            <div>
              <button
                id="dropdownDefaultButton"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
              >
                Subjects
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
                  {subjects.map((subject) => (
                    <li key={subject._id}>
                      <Link
                        to="/subjects"
                        onClick={() => onClick(subject)}
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        {subject.name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      to="/addsubject"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Add Subject
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* ASSIGNMENTS - HEADING */}

        <div className="flex my-3 flex-row items-center gap-3">
          <h1 className="text-4xl font-extrabold dark:text-white">
            <small className="ml-1 font-semibold text-gray-500 dark:text-gray-400">
              Assignments
            </small>
          </h1>
          <button
            style={{ height: "30px", width: "30px", marginTop: 10 }}
            type="button"
            className="text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            onClick={() => addExamButton("assignment")}
          >
            +
          </button>
          </div>

            {/* ASSIGNMENTS - TABLE */}
            <ExamTable key={subject._id} assignments={assignments}/>

      </div>
    </>
  );
};

export default Subjects;
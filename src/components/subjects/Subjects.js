import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SemesterContext from "../../context/semester/SemesterContext";
import SubjectContext from "../../context/subject/SubjectContext";
import ExamContext from "../../context/exam/ExamContext";
import ExamTable from "./ExamTable";
import "flowbite";

const Subjects = () => {
  // CONTEXTS
  const semesterContext = useContext(SemesterContext);
  const { active, semesters } = semesterContext;

  const subjectContext = useContext(SubjectContext);
  const { subjects, getSubjects } = subjectContext;

  const examContext = useContext(ExamContext);
  const { exams, getExams, calcAndAddSGPA } = examContext;

  // STATES
  const [subject, setSubject] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [homework, setHomework] = useState([]);
  const [project, setProject] = useState([]);
  const [midterm, setMidterm] = useState([]);
  const [final, setFinal] = useState([]);
  const [openSections, setOpenSections] = useState({});
  let [trash, setTrash] = useState(0);

  // EFFECTS
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      const fetchData = async () => {
        if (active && active._id) {
          await getSubjects(active._id);
        }
      };
      fetchData();
    }
  }, [active, getSubjects, navigate]);


  useEffect(() => {
    const fetchData = async () => {
      if (active && active._id && subject._id) {
        await getExams(active._id, subject._id);
        // calcAndAddSGPA(subject._id);
      }
    };
    fetchData();
  }, [active, subject, getExams]);

  useEffect(() => {
    if (Array.isArray(exams)) {
      const assignmentExams = exams.filter(
        (exam) => exam.examType === "assignment"
      );
      setAssignments(assignmentExams);

      const quizExams = exams.filter((exam) => exam.examType === "quiz");
      setQuiz(quizExams);

      const homeworkExam = exams.filter((exam) => exam.examType === "homework");
      setHomework(homeworkExam);

      const projectExam = exams.filter((exam) => exam.examType === "project");
      setProject(projectExam);

      const midExam = exams.filter((exam) => exam.examType === "midterm");
      setMidterm(midExam);

      const finalExam = exams.filter((exam) => exam.examType === "final");
      setFinal(finalExam);
    }
  }, [exams]);

  useEffect(() => {
    if (subjects.length > 0 && !subject._id) {
      setSubject(subjects[0]);
    }
  }, [subjects, subject]);

  // BUTTON FUNCTIONS
  const onClick = (subject) => {
    setSubject(subject);
    setDropdownOpen(false);
    setAssignments([]);
    setQuiz([]);
    setHomework([]);
    setProject([]);
    setMidterm([]);
    setFinal([]);
  };

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  function checkActive() {
    return active && active._id;
  }

  return (
    <>
      {/* TOP HEADING + DROPDOWN FOR SUBJECTS */}
      {checkActive() ? (
        <div className="p-4 sm:ml-64">
          <div
            className="upper-row flex justify-between items-center"
            style={{ marginBottom: 10 }}
          >
            {subjects.length > 0 ? (
              <h1 className="text-5xl font-extrabold dark:text-white">
                {subject.name}
              </h1>
            ) : (
              <h1 className="text-5xl font-extrabold dark:text-white">
                No subjects found.
              </h1>
            )}
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
                    {Array.isArray(subjects) &&
                      subjects.map((subject) => (
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

          {/* ACCORDION */}
          {subjects.length > 0 ? (
            <div
              className="my-5"
              id="accordion-collapse"
              data-accordion="collapse"
            >
              {[
                {
                  type: "assignment",
                  label: "Assignments",
                  exams: assignments,
                },
                { type: "quiz", label: "Quiz", exams: quiz },
                { type: "homework", label: "Homework", exams: homework },
                { type: "project", label: "Project", exams: project },
                { type: "midterm", label: "Midterm", exams: midterm },
                { type: "final", label: "Final", exams: final },
              ].map((section, index) => (
                <div key={section.type}>
                  <h2 id={`accordion-collapse-heading-${index}`}>
                    <button
                      type="button"
                      className="flex items-center justify-between w-full p-4 font-medium text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                      onClick={() => toggleSection(index)}
                    >
                      <span>{section.label}</span>
                      <svg
                        className={`w-3 h-3 transition-transform ${
                          openSections[index] ? "rotate-180" : ""
                        }`}
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
                          d="M9 5 5 1 1 5"
                        />
                      </svg>
                    </button>
                  </h2>
                  <div
                    id={`accordion-collapse-body-${index}`}
                    className={openSections[index] ? "" : "hidden"}
                    aria-labelledby={`accordion-collapse-heading-${index}`}
                  >
                    <div className="p-3 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                      <ExamTable
                        key={`${section.type}-${subject._id}`}
                        subject={section.exams}
                        s={subject}
                      />
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Link
                          to={`/addexam/${section.type}`}
                          state={{ id: subject._id }}
                        >
                          <button
                            style={{
                              height: "30px",
                              width: "30px",
                              marginTop: 15,
                              marginBottom: 10,
                            }}
                            type="button"
                            className="text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                          >
                            +
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p></p>
          )}
        </div>
      ) : (
        <p className="p-4 sm:ml-64 text-5xl font-extrabold dark:text-white">
          Set an active semester first
        </p>
      )}
    </>
  );
};

export default Subjects;

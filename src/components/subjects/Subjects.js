import SemesterContext from "../../context/semester/SemesterContext";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SubjectContext from "../../context/subject/SubjectContext";

const Subjects = () => {
  const semesterContext = useContext(SemesterContext);
  const { active } = semesterContext;

  const subjectContext = useContext(SubjectContext);
  const { subjects, getSubjects } = subjectContext;

  const [subject, setSubject] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (active && active._id) {
        await getSubjects(active._id);
      }
    };
    fetchData();
  }, [active, getSubjects]);

  useEffect(() => {
    if (subjects.length > 0 && !subject._id) {
      setSubject(subjects[0]);
    }
  }, [subjects, subject]);

  const onClick = (subject) => {
    setSubject(subject);
    setDropdownOpen(false);
  };

  return (
    <>
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
        <div style={{ marginTop: 30 }}>
          {/* <SubjectTable subjects={subjects} /> */}
        </div>
      </div>
    </>
  );
};

export default Subjects;

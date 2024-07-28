import { useContext, useState } from "react";
import SubjectContext from "./SubjectContext";
import SemesterContext from "../semester/SemesterContext";
import Swal from "sweetalert2";

const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5NjQ5OWExNDNhZWRmNWIxNWQzNGZjIn0sImlhdCI6MTcyMTEyNTMxNH0.hvbRFYZo-DrqCidjhMSBFR42QkLoWz4NGWD9NzaPUKc";
const host = "http://localhost:5000";

const SubjectState = (props) => {
  const { active } = useContext(SemesterContext);
  const [subjects, setSubjects] = useState([]);
  const alert = (is) => {
    if (is) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Subject added successfully.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error adding subject",
          });
    }
  };

  const getSubjects = async (semesterID) => {
    const response = await fetch(`${host}/api/subject/fetchsubjects`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
        semesterID: semesterID,
      },
    });
    const a = await response.json();
    setSubjects(a);
  };

  const addSubject = async (
    semesterID,
    name,
    creditHrs,
    subjectType,
    grading,
    grade,
    teacherName
  ) => {
    const response = await fetch(`${host}/api/subject/newsubject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
        semesterID: semesterID,
      },
      body: JSON.stringify({
        name,
        creditHrs,
        subjectType,
        grading,
        grade,
        teacherName,
      }),
    });
    const a = await response.json();
    alert(a.success);
    setSubjects([...subjects, a]);
  };

  const addGrade = async (semesterID, subjectID, grade) => {
    const response = await fetch(`${host}/api/subject/addgrade/${subjectID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
        semesterID: semesterID,
      },
      body: JSON.stringify({ grade }),
    });
    await response.json();
    for (let i = 0; i < subjects.length; i++) {
      const element = subjects[i];
      if (element._id === subjectID) {
        subjects[i].grade = grade;
      }
    }
  };

  const deleteSubject = async (subjectID) => {
    const response = await fetch(
      `${host}/api/subject/deletesubject/${subjectID}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
          semesterID: active._id,
        },
      }
    );
    const newSubjects = subjects.filter((subject) => subject._id !== subjectID);
    setSubjects(newSubjects);
  };

  return (
    <SubjectContext.Provider
      value={{ subjects, getSubjects, addSubject, addGrade, deleteSubject }}
    >
      {props.children}
    </SubjectContext.Provider>
  );
};

export default SubjectState;

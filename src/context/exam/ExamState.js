import { useState, useEffect } from "react";
import ExamContext from "../exam/ExamContext";

const host = "http://localhost:5000";
const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5NjQ5OWExNDNhZWRmNWIxNWQzNGZjIn0sImlhdCI6MTcyMTEyNTMxNH0.hvbRFYZo-DrqCidjhMSBFR42QkLoWz4NGWD9NzaPUKc";

const ExamState = (props) => {
  const [exams, setExams] = useState([]);

  // FETCH EXAMS
  const getExams = async (semesterID, subjectID) => {
      try {
      const respose = await fetch(`${host}/api/exam/fetchexams`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
          "semesterID": semesterID,
          "subjectID": subjectID,
        },
      });
      const a = await respose.json();
      setExams(a);
    }
  catch (error) {
    console.error("Error fetching exams:", error);
  }};

  // ADD EXAM
  const addExam = async(semesterID,subjectID,examType,totalMarks,obtainedMarks,averageMarks,weightage) =>{
    try {
      const response = await fetch(`${host}/api/exam/newexam`,{
        method:'POST',
        headers:{
          "Content-Type": "application/json",
          "auth-token": authToken,
          "semesterID": semesterID,
          "subjectID": subjectID,
        },
        body: JSON.stringify({ examType,totalMarks,obtainedMarks,averageMarks,weightage }),
      })
      const a = await response.json()
      setExams([...exams,a]);
      console.log(a);
    } catch (error) {
      console.error("Error adding exams:", error);
    }
  }
  

  return (
    <ExamContext.Provider value={{ exams, getExams,addExam }}>
      {props.children}
    </ExamContext.Provider>
  );
};

export default ExamState;
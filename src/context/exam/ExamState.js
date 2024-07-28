import { useState, useContext } from "react";
import ExamContext from "../exam/ExamContext";
import SubjectContext from "../subject/SubjectContext";
import SemesterContext from "../semester/SemesterContext";

const host = "http://localhost:5000";
const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5NjQ5OWExNDNhZWRmNWIxNWQzNGZjIn0sImlhdCI6MTcyMTEyNTMxNH0.hvbRFYZo-DrqCidjhMSBFR42QkLoWz4NGWD9NzaPUKc";

const ExamState = (props) => {
  const [exams, setExams] = useState([]);

  const {subjects,addGrade} = useContext(SubjectContext);
  const {active} = useContext(SemesterContext);
  const calcAndAddGrade = async (subjectID, obtainedWeightage, examWeightage) => {
    let obtainedWeightages = 0;
    let allWeightages = 0;
    let percentage = 0;

    for (let i = 0; i < exams.length; i++) {
      const element = exams[i];
      obtainedWeightages += Number(element.obtainedWeightage);
    }
    obtainedWeightages += Number(obtainedWeightage);
    for (let i = 0; i < exams.length; i++) {
      const element = exams[i];
      allWeightages += Number(element.weightage);
    }
    allWeightages += Number(examWeightage);

    if(obtainedWeightages!==0 && allWeightages !==0){
      percentage = obtainedWeightages/allWeightages*100;
      const subjectssss = subjects.filter((subject)=>subject._id===subjectID);
      let grade;
      if(subjectssss[0].grading==="Relative"){
        grade = 'B';
      }
      else if(subjectssss[0].grading==="Absolute"){
        if (percentage >= 90) {
          grade = 'A+';
        } else if (percentage >= 86) {
          grade = 'A';
        } else if (percentage >= 82) {
          grade = 'A-';
        } else if (percentage >= 78) {
          grade = 'B+';
        } else if (percentage >= 74) {
          grade = 'B';
        } else if (percentage >= 70) {
          grade = 'B-';
        } else if (percentage >= 66) {
          grade = 'C+';
        } else if (percentage >= 62) {
          grade = 'C';
        } else if (percentage >= 58) {
          grade = 'C-';
        } else if (percentage >= 54) {
          grade = 'D+'; 
        } else if (percentage >= 50) {
          grade = 'D';
        } else {
          grade = 'F';
        }
      }
      addGrade(active._id,subjectID,grade);
    }
  };

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
      if(a.success===true){
        calcAndAddGrade(subjectID,(((weightage*((obtainedMarks/totalMarks)*100))/100).toFixed(3)),(weightage));
      }
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
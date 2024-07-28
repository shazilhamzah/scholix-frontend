import { useState, useContext } from "react";
import ExamContext from "../exam/ExamContext";
import SubjectContext from "../subject/SubjectContext";
import SemesterContext from "../semester/SemesterContext";
import Swal from "sweetalert2";

const host = "http://localhost:5000";
const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5NjQ5OWExNDNhZWRmNWIxNWQzNGZjIn0sImlhdCI6MTcyMTEyNTMxNH0.hvbRFYZo-DrqCidjhMSBFR42QkLoWz4NGWD9NzaPUKc";

const ExamState = (props) => {

  // STATES
  const [exams, setExams] = useState([]);

  // CONTEXTS
  const {subjects,addGrade} = useContext(SubjectContext);
  const {active,addSGPA} = useContext(SemesterContext);

  // FUNCTIONS
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
  const calcAndAddSGPA = async (subjectID) =>{
    let index = 0;
    let sgpa = 0;
    for (index; index < subjects.length; index++) {
      const element = subjects[index];
      let grade = element.grade;
      if(grade){
        if(grade==="A+" || grade==="A"){
          sgpa+=4.0;
        }
        else if(grade==="A-"){
          sgpa+=3.67;
        }
        else if(grade==="B+"){
          sgpa+=3.33;
        }
        else if(grade==="B"){
          sgpa+=3;
        }
        else if(grade==="B-"){
          sgpa+=2.67;
        }
        else if(grade==="C+"){
          sgpa+=2.33;
        }
        else if(grade==="C"){
          sgpa+=2;
        }
        else if(grade==="C-"){
          sgpa+=1.67;
        }
        else if(grade==="D+"){
          sgpa+=1.33;
        }
        else if(grade==="D"){
          sgpa+=1;
        }
        else if(grade==="F"){
          sgpa+=0.0;
        }
      }
    }
    await addSGPA(active._id,sgpa/index);
  };
  const alert = (a)=>{
    if(a){
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Exam added successfully",
        showConfirmButton: false,
        timer: 1500
      });
    }
    else{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error adding exam",
      });
    }
  }

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
        calcAndAddSGPA(subjectID);
      }
      alert(a.success);
    } catch (error) {
      console.error("Error adding exams:", error);
    }
  };

  const deleteExam = async(subjectID,examID)=>{
    const response = await fetch(`${host}/api/exam/deleteexam/${examID}`,
      {
        method:"DELETE",
        headers:{
          "Content-Type": "application/json",
          "auth-token": authToken,
          "semesterID": active._id,
          "subjectID": subjectID,
        },
      }
    )
    const newExams = exams.filter((exam)=>exam._id!==examID);
    setExams(newExams);
  }
  
  return (
    <ExamContext.Provider value={{ exams, getExams,addExam,deleteExam }}>
      {props.children}
    </ExamContext.Provider>
  );
};

export default ExamState;
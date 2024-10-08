import React, { useState, useContext, useEffect } from "react";
import ExamContext from "../exam/ExamContext";
import SubjectContext from "../subject/SubjectContext";
import SemesterContext from "../semester/SemesterContext";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";

const host = process.env.REACT_APP_BACKEND_HOST;

const ExamState = (props) => {
  // STATES
  const [exams, setExams] = useState([]);
  const [fileData, setFileData] = useState([]);

  // CONTEXTS
  const { subjects, addGrade } = useContext(SubjectContext);
  const { active, addSGPA } = useContext(SemesterContext);

  useEffect(() => {
    // Fetch and process the Excel file
    const fetchExcelFile = async () => {
      try {
        const response = await fetch(`${process.env.PUBLIC_URL}/MCA.xlsx`);
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        setFileData(data);
      } catch (error) {
        console.error("Error fetching and processing Excel file:", error);
      }
    };

    fetchExcelFile();
  }, []);

  const calcAndAddSGPA = async (subjectID) => {
    let index = 0;
    let sgpa = 0;
    let totalCredHrs = 0;
    for (index; index < subjects.length; index++) {
      const element = subjects[index];
      let grade = element.grade;
      let credHr = element.creditHrs;
      totalCredHrs += credHr;
      if (grade) {
        switch (grade) {
          case "A+":
          case "A":
            sgpa += 4.0 * credHr;
            break;
          case "A-":
            sgpa += 3.67 * credHr;
            break;
          case "B+":
            sgpa += 3.33 * credHr;
            break;
          case "B":
            sgpa += 3 * credHr;
            break;
          case "B-":
            sgpa += 2.67 * credHr;
            break;
          case "C+":
            sgpa += 2.33 * credHr;
            break;
          case "C":
            sgpa += 2 * credHr;
            break;
          case "C-":
            sgpa += 1.67 * credHr;
            break;
          case "D+":
            sgpa += 1.33 * credHr;
            break;
          case "D":
            sgpa += 1 * credHr;
            break;
          case "F":
            sgpa += 0.0 * credHr;
            break;
          default:
            break;
        }
      }
    }
    addSGPA(active._id, sgpa / totalCredHrs);
  };

  const alert = (a) => {
    Swal.fire({
      position: "center",
      icon: a ? "success" : "error",
      title: a ? "Exam added successfully" : "Oops...",
      text: a ? undefined : "Error adding exam",
      showConfirmButton: !a,
      timer: a ? 1500 : undefined,
    });
  };

  const calculateAbsoluteGrade = (percentage) => {
    console.log(percentage);
    if (percentage >= 90) return "A+";
    if (percentage >= 86) return "A";
    if (percentage >= 82) return "A-";
    if (percentage >= 78) return "B+";
    if (percentage >= 74) return "B";
    if (percentage >= 70) return "B-";
    if (percentage >= 66) return "C+";
    if (percentage >= 62) return "C";
    if (percentage >= 58) return "C-";
    if (percentage >= 54) return "D+";
    if (percentage >= 50) return "D";
    return "F";
  };

  const getGradeForAverage = (MCA, averageScore) => {
    const data = fileData;

    // Convert MCA to a number
    const mcaNumeric = Math.ceil(Number(MCA));
    console.log("MCA (numeric):", mcaNumeric);

    let mcaRowIndex = -1;

    // Find the row for the given MCA
    for (let i = 1; i < data.length; i++) {
      const mcaValue = Math.ceil(Number(data[i][0]))
        ? Math.ceil(Number(data[i][0]))
        : null;
      if (mcaValue === mcaNumeric) {
        mcaRowIndex = i;
        break;
      }
    }

    if (mcaRowIndex === -1) {
      console.error(`MCA '${MCA}' not found in the Excel sheet.`);
      return "MCA not found";
    }

    const grades = data[1].slice(1);
    let closestIndex = -1;

    // Special handling for '≥87'
    if (averageScore >= 87) {
      closestIndex = data[mcaRowIndex].length - 1; // Last column corresponds to '≥87'
    } else {
      let minDiff = Infinity;

      // Find the closest average score
      for (let i = 1; i < data[mcaRowIndex].length; i++) {
        const value = data[mcaRowIndex][i];
        const diff = Math.abs(value - averageScore);
        if (value <= averageScore && diff < minDiff) {
          minDiff = diff;
          closestIndex = i;
        }
      }
    }

    if (closestIndex === -1) {
      console.error("No valid average found for the given score.");
      return "No valid average found";
    }

    return grades[closestIndex - 1]; // Adjust for zero-based index
  };

  const calcAndAddGrade = async (
    subjectID,
    obtainedWeightage,
    examWeightage,
    average1,
    updatedExams = [] // This now includes all exams, not just the new one
  ) => {
    let obtainedWeightages = 0;
    let allWeightages = 0;
    let percentage = 0;
    let averages = 0;
    let avg = 0;
    console.log("I was at checkpoint 2");
    console.log(updatedExams);

    // Loop through all exams to accumulate weightages
    for (let i = 0; i < updatedExams.length; i++) {
      const element = updatedExams[i];
      if (!isNaN(element.averageMarks)) {
        avg = (element.averageMarks / element.totalMarks) * element.weightage;
        averages += avg; // Accumulate only valid numbers
      } else {
        console.warn(`Invalid averageMarks for exam ID: ${element._id}`);
      }
      obtainedWeightages += Number(element.obtainedWeightage);
      allWeightages += Number(element.weightage);
    }

    console.log("Averages:", averages);
    console.log("All Weightages:", allWeightages);

    // Now, calculate the percentage based on total weightages
    if (obtainedWeightages !== 0 && allWeightages !== 0) {
      percentage = (obtainedWeightages / allWeightages) * 100;
      let averagePercentage = (averages / allWeightages) * 100;
      const subject = subjects.find((subject) => subject._id === subjectID);

      let grade;
      if (subject.grading === "Relative") {
        try {
          if (averagePercentage === 0) {
            console.error(averagePercentage, "Average Percentage cannot be 0");
            return;
          }
          grade = getGradeForAverage(averagePercentage, percentage);
        } catch (error) {
          console.error(error.message);
        }
      } else if (subject.grading === "Absolute") {
        grade = calculateAbsoluteGrade(percentage);
      }

      // If a valid grade is found, update it for the subject
      if (grade) {
        addGrade(active._id, subjectID, grade).then(() => {
          calcAndAddSGPA(subjectID);
        });
      }
    }
  };

  const getExams = async (semesterID, subjectID) => {
    try {
      const response = await fetch(`${host}/api/exam/fetchexams`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
          semesterID: semesterID,
          subjectID: subjectID,
        },
      });
      const data = await response.json();
      setExams(data);
      return data;
    } catch (error) {
      console.error("Error fetching exams:", error);
      return [];
    }
  };

  const addExam = async (
    semesterID,
    subjectID,
    examType,
    totalMarks,
    obtainedMarks,
    averageMarks,
    weightage
  ) => {
    try {
      // Adding the new exam
      const response = await fetch(`${host}/api/exam/newexam`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
          semesterID: semesterID,
          subjectID: subjectID,
        },
        body: JSON.stringify({
          examType,
          totalMarks,
          obtainedMarks,
          averageMarks,
          weightage,
        }),
      });

      const data = await response.json();

      if (data.success === true) {
        // Fetch all exams again after adding the new one
        const updatedExams = await getExams(semesterID, subjectID);

        // Calculate and add the grade, taking into account all previous exams
        calcAndAddGrade(
          subjectID,
          ((weightage * ((obtainedMarks / totalMarks) * 100)) / 100).toFixed(3),
          weightage,
          Math.ceil(
            Number((weightage * ((averageMarks / totalMarks) * 100)) / 100)
          ),
          updatedExams // Pass all exams including the new one
        );

        // Recalculate SGPA based on all exams
        calcAndAddSGPA(subjectID);
      }
      alert(data.success);
    } catch (error) {
      console.error("Error adding exam:", error);
    }
  };

  const deleteExam = async (subjectID, examID) => {
    try {
      await fetch(`${host}/api/exam/deleteexam/${examID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
          semesterID: active._id,
          subjectID: subjectID,
        },
      });
      const newExams = exams.filter((exam) => exam._id !== examID);
      setExams(newExams);
    } catch (error) {
      console.error("Error deleting exam:", error);
    }
  };

  return (
    <ExamContext.Provider
      value={{ exams, getExams, addExam, deleteExam, calcAndAddSGPA }}
    >
      {props.children}
    </ExamContext.Provider>
  );
};

export default ExamState;

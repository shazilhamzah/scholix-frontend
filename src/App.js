import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Semester } from "./components/semester/Semesters";
import { AddSemester } from "./components/semester/AddSemester";
import SemesterState from "./context/semester/SemesterState";

import SubjectState from "./context/subject/SubjectState";
import Subjects from "./components/subjects/Subjects";
import ExamState from "./context/exam/ExamState";
import { AddSubject } from "./components/subjects/AddSubject";
import { AddExam } from "./components/subjects/AddExam";

import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./components/dashboard/Dashboard";


function App() {
  return (
    <>
      <Router>
        <Sidebar />
        <div className="container">
            <SemesterState>
            <SubjectState>
              <ExamState>
              <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/semesters" element={<Semester />} />
              <Route path="/addsemester" element={<AddSemester/>}/>
              <Route path="/subjects" element={<Subjects/>}/>
              <Route path="/addsubject" element={<AddSubject/>}/>
              <Route path="/addexam/:type" element={<AddExam/>}/>
              </Routes>
              </ExamState>
              </SubjectState>
            </SemesterState>
        </div>
      </Router>
    </>
  );
}

export default App;

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Semester } from "./components/semester/Semesters";
import { AddSemester } from "./components/semester/AddSemester";
import SemesterState from "./context/semester/SemesterState";

import SubjectState from "./context/subject/SubjectState";
import Subjects from "./components/subjects/Subjects";
import { AddSubject } from "./components/subjects/AddSubject";

import { Sidebar } from "./components/Sidebar";


function App() {
  return (
    <>
      <Router>
        <Sidebar />
        <div className="container">
            <SemesterState>
            <SubjectState>
              <Routes>
              <Route path="/semesters" element={<Semester />} />
              <Route path="/addsemester" element={<AddSemester/>}/>
              <Route path="/subjects" element={<Subjects/>}/>
              <Route path="/addsubject" element={<AddSubject/>}/>
              </Routes>
              </SubjectState>
            </SemesterState>
        </div>
      </Router>
    </>
  );
}

export default App;

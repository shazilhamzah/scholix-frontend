import { Semester } from "./components/Semesters";
import { Sidebar } from "./components/Sidebar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SemesterState from "./context/semester/SemesterState";

function App() {
  return (
    <>
      <Router>
        <Sidebar />
        <div className="container">
            <SemesterState>
              <Routes>
              <Route path="/semesters" element={<Semester />} />
              </Routes>
            </SemesterState>
        </div>
      </Router>
    </>
  );
}

export default App;

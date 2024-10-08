import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Semester } from "./components/semester/Semesters";
import { AddSemester } from "./components/semester/AddSemester";
import SemesterState from "./context/semester/SemesterState";
import SubjectState from "./context/subject/SubjectState";
import Subjects from "./components/subjects/Subjects";
import ExamState from "./context/exam/ExamState";
import { AddSubject } from "./components/subjects/AddSubject";
import { AddExam } from "./components/subjects/AddExam";
import { Dashboard } from "./components/dashboard/Dashboard";
import { Sidebar } from "./components/sidebar/Sidebar";
import { Login } from "./components/auth/Login";
import { Signup } from "./components/auth/Signup";
import { useEffect } from "react";
import { Home } from "./components/home/Home";
import { NewDashboard } from "./components/sidebar/Sidebar";

function Layout({ children }) {
  const location = useLocation();
  const hideSidebar =
    location.pathname === "/login" ||
    location.pathname === "/" ||
    location.pathname === "/signup";

  const location1 = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location1.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      navigate("/dashboard");
    }
  }, [location1, navigate]);

  
  return (
    <>
      {!hideSidebar && <Sidebar />}
      <div className="container">{children}</div>
    </>
  );
}

function App() {
  return (
    <Router>
      <SemesterState>
        <SubjectState>
          <ExamState>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/semesters" element={<Semester />} />
                <Route path="/addsemester" element={<AddSemester />} />
                <Route path="/subjects" element={<Subjects />} />
                <Route path="/addsubject" element={<AddSubject />} />
                <Route path="/addexam/:type" element={<AddExam />} />
                <Route  path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
            </Layout>
          </ExamState>
        </SubjectState>
      </SemesterState>
    </Router>
  );
}

export default App;

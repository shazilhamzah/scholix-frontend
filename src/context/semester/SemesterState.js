import { useState } from "react";
import SemesterContext from "./SemesterContext";
import { useEffect } from "react";

const host = "http://localhost:5000";
const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5NjQ5OWExNDNhZWRmNWIxNWQzNGZjIn0sImlhdCI6MTcyMTEyNTMxNH0.hvbRFYZo-DrqCidjhMSBFR42QkLoWz4NGWD9NzaPUKc";

const SemesterState = (props) => {
  const [semesters, setSemesters] = useState([]);
  const [active,setActive] = useState({});

  useEffect(() => {
    const activeSemester = localStorage.getItem('activeSemester');
    if (activeSemester) {
      setActive(JSON.parse(activeSemester));
    }
  }, []);

  // FETCH NOTES
  const getSemesters = async () => {
    const response = await fetch(`${host}/api/semester/fetchsemesters`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // "auth-token": localStorage.getItem("token"),
        "auth-token": authToken,
      },
    });
    const a = await response.json();
    setSemesters(a);
  };

  const addSemester = async (name,sgpa) => {
    if(!sgpa){
      sgpa=0;
    }
    const response = await fetch(`${host}/api/semester/newsemester`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "auth-token": localStorage.getItem("token"),
        "auth-token": authToken,
      },
      body: JSON.stringify({ name,sgpa }),
    });
    const a = await response.json();
    console.log(a);
    setSemesters([...semesters, a]);
  };

  const addSGPA = async (id, sgpa) => {
    console.log(id)
    const response = await fetch(`${host}/api/semester/addsgpa/${id}`, {
        method:"POST",
        headers:{
          "Content-Type": "application/json",
            // "auth-token": localStorage.getItem("token"),
            "auth-token": authToken,  
        },
        body: JSON.stringify({ sgpa })
    });
    let newsemesters = JSON.parse(JSON.stringify(semesters));
      for (let index = 0; index < newsemesters.length; index++){
        const element = newsemesters[index];
        if(element._id===id){
          newsemesters[index].sgpa=sgpa;
          break;
        }
      }
      setSemesters(newsemesters);
      const a = await response.json();
      console.log(a)  
  };

  const setActiveSemester = async (semesterId) => {
    const response = await fetch(`${host}/api/semester/toggleactive/${semesterId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
      body: JSON.stringify({ semesterId }),
    });
    const data = await response.json();
    setActive(data);
    localStorage.setItem('activeSemester', JSON.stringify(data));
    console.log(active)
  };

  return (
    <SemesterContext.Provider value={{ semesters,active, getSemesters, addSemester,addSGPA,setActiveSemester }}>
      {props.children}
    </SemesterContext.Provider>
  );
};

export default SemesterState;

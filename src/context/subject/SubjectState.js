import { useState } from "react";
import SubjectContext from "./SubjectContext";

const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5NjQ5OWExNDNhZWRmNWIxNWQzNGZjIn0sImlhdCI6MTcyMTEyNTMxNH0.hvbRFYZo-DrqCidjhMSBFR42QkLoWz4NGWD9NzaPUKc";
const host = "http://localhost:5000";

const SubjectState = (props) =>{

    const [subjects,setSubjects] = useState([]);


    const getSubjects = async (semesterID) => {
        const response = await fetch(`${host}/api/subject/fetchsubjects`,{
            method:"GET",
            headers:{
                "Content-Type": "application/json",
                "auth-token":authToken,
                "semesterID":semesterID
            }
        });
        const a = await response.json();
        setSubjects(a);
    };

    const addSubject = async(semesterID,name,creditHrs,subjectType,grading,grade,teacherName)=>{
        console.log("Teacher name input 2: ",teacherName);
        const response = await fetch(`${host}/api/subject/newsubject`,{
            method:'POST',
            headers:{
                "Content-Type": "application/json",
                "auth-token":authToken,
                "semesterID":semesterID
            },
            body: JSON.stringify({ name,creditHrs,subjectType,grading,grade,teacherName }),
        });
        const a = await response.json();
        setSubjects([...subjects,a]);
        console.log(a);
    }


    return (
        <SubjectContext.Provider value={{ subjects,getSubjects,addSubject }}>
          {props.children}
        </SubjectContext.Provider>
      );
}

export default SubjectState;
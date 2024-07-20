import { useState } from "react";
import SemesterContext from "./SemesterContext";

const SemesterState = (props) =>{
    const host = "http://localhost:5000";

    const [semesters,setSemesters] = useState([]);


    // FETCH NOTES
    const getSemesters = async (id,name,sgpa) =>{
        const response = await fetch(`${host}/api/semester/fetchsemesters`,{
            method:"GET",
            headers:{
                "Content-Type": "application/json",
                // "auth-token": localStorage.getItem("token"),
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5NjQ5OWExNDNhZWRmNWIxNWQzNGZjIn0sImlhdCI6MTcyMTEyNTMxNH0.hvbRFYZo-DrqCidjhMSBFR42QkLoWz4NGWD9NzaPUKc"
            }
        });
        const a = await response.json();
        console.log(a);
        setSemesters(a);
    }

    return (
        <SemesterContext.Provider value={{ semesters, getSemesters }}>
          {props.children}
        </SemesterContext.Provider>
      );
}


export default SemesterState;
import UserContext from "./UserContext";

const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5NjQ5OWExNDNhZWRmNWIxNWQzNGZjIn0sImlhdCI6MTcyMTEyNTMxNH0.hvbRFYZo-DrqCidjhMSBFR42QkLoWz4NGWD9NzaPUKc";
const host = "http://localhost:5000";


const UserState = (props) =>{

    const addCGPA = async(cgpa)=>{
        const response = await fetch(`${host}/api/gpa/addcgpa`,{
            method:'POST',
            headers:{
                "Content-Type": "application/json",
                "auth-token":authToken
            },
            body:JSON.stringify({cgpa})
        });
        const a = await response.json();
        console.log(a);
    }


    return(
        <UserContext.Provider value={{addCGPA}}>{props.children}</UserContext.Provider>
    )
}

export default UserState;
import UserContext from "./UserContext";

const authToken = localStorage.getItem("token");
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
    }


    return(
        <UserContext.Provider value={{addCGPA}}>{props.children}</UserContext.Provider>
    )
}

export default UserState;
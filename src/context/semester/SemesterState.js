import { useState,useEffect } from "react";
import SemesterContext from "./SemesterContext";
import Swal from "sweetalert2";

const host = "http://localhost:5000";

const SemesterState = (props) => {
  const [semesters, setSemesters] = useState([]);
  const [active,setActive] = useState({});
  const [user,setUser] = useState()

  useEffect(() => {
    const activeSemester = localStorage.getItem('activeSemester');
    if (activeSemester) {
      setActive(JSON.parse(activeSemester));
    }
  }, []);

  const alert = (isSuccess)=>{
    if(isSuccess){
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Semester added successfully.",
        showConfirmButton: false,
        timer: 1500
      });
    }
    else{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error adding semester!",
      });
    }
  }


  // FETCH USER
  const getUser = async () => {
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getUser();
      getSemesters();
    }
  }, []);

  // FETCH NOTES
  const getSemesters = async () => {
    const response = await fetch(`${host}/api/semester/fetchsemesters`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
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
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ name,sgpa }),
    });
    const a = await response.json();
    alert(a.success);
    setSemesters([...semesters, a]);
  };

  const addSGPA = async (id, sgpa) => {
    const response = await fetch(`${host}/api/semester/addsgpa/${id}`, {
        method:"POST",
        headers:{
          "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),  
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
      for (let index = 0; index < semesters.length; index++) {
        const element = semesters[index];
        if(element.active){
          setActive(element);
        }
      }
    };

  const setActiveSemester = async (semesterId) => {
    const response = await fetch(`${host}/api/semester/toggleactive/${semesterId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ semesterId }),
    });
    const data = await response.json();
    setActive(data);
    localStorage.setItem('activeSemester', JSON.stringify(data));
  };

  const deleteSemester = async (semesterId)=>{
    const response = await fetch(`${host}/api/semester/deletesemester/${semesterId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const newsemesters = semesters.filter((sem)=>sem._id!==semesterId);
    setSemesters(newsemesters);
    if (active && active._id === semesterId) {
      setActive(null);
      localStorage.removeItem('activeSemester');
    }
  }

  return (
    <SemesterContext.Provider value={{ semesters,active,user,getUser, getSemesters, addSemester,addSGPA,setActiveSemester,deleteSemester }}>
      {props.children}
    </SemesterContext.Provider>
  );
};

export default SemesterState;

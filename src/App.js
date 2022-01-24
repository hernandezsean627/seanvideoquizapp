import React, { useEffect, useState } from 'react';
import {  getDocs, collection, } from "firebase/firestore";
import { db } from "./firebase-config";
import { 
  
  
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import './App.css';
import { auth } from "./firebase-config";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Video from "./components/Video";
import CreateCourse from "./components/CreateCourse";
import CreateLesson from "./components/CreateLesson";
import ViewCourse from "./components/ViewCourse";


function App() {
 
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [onRegister, setOnRegister] = useState(false);
  const [onCreate, setOnCreate] = useState(false);
  const [onCreateLesson, setOnCreateLesson] = useState(false);
  const [onVideo, setOnVideo] = useState(false);
  const [onView, setOnView] = useState(false);

  const [courseId, setCourseId] = useState("");
  
  const [courseLists, setCourseList] = useState([]);
 
  

  const coursesCollectionRef = collection(db, "courses");

  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);

  })



  useEffect(() => {
    const getCourses = async () => {
        const data = await getDocs(coursesCollectionRef);
        setCourseList(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    };

    getCourses();
}) 




  const handleRegister = async () => {
    if (onRegister) {
      setOnRegister(false);
    } else {
      setOnRegister(true);
    }
  }

 
  const logout = async () => {

    await signOut(auth).then(() => {
       
       setLoginEmail("");
       setLoginPassword("")
    });

  }

  const handleCreate = async () => {
   
      setOnCreate(true);
      setOnVideo(false);
  }
  
  const handleVideo = async () => {
    
      setOnVideo(true);
      setOnCreate(false);
   
  }  
  const handleHome = async () => {
    
      setOnVideo(false);
      setOnCreate(false);
   
  }  
  const handleLesson = async (course) => {
    
    setOnCreateLesson(true);
    setCourseId(course.id);
   
  }  
  


  return (
    <div className="App">
      <nav>
        <p onClick={handleHome}  >Home </p>
        <br/>
       
    
        {user ? <>
        
          <p onClick={handleVideo}>Video </p>
        <br/>
        <p onClick={handleCreate}>Create </p>
        <br/>
        <p onClick={logout}>Logout</p></> : <> 
        <p onClick={handleRegister}>   {onRegister ? <> Login </> : <> Register </>}</p>
        
        </> }
       
      </nav>
     
      <div className="homePage">
      
      {user ? 
      <div>
        {!onCreate && !onVideo ? <>
          <Home user={user}   />  
         <h1>Course List</h1>
        
        {courseLists.map((course) => {
          return (
            <div >
            <h2 onClick={() => {
              setCourseId(course.id)
              setOnView(true)
            }}>
            {course.title}
            </h2>
           
            
            <button  onClick={() => {handleLesson(course)}}>Create Lesson</button>
          </div>
          )
        }
          
        )}

        
        </> : <></>}

       

        {onCreate ? <><CreateCourse handleHome={handleHome} /></> : <></>}
        {!onCreate && onVideo ? <><Video user={user}   /></> : <></>}
        {onCreateLesson ? <><CreateLesson handleHome={handleHome} courseId={courseId} /></> : <></>}
        {onView ? <><ViewCourse courseId={courseId} /> </> : <></>}

      </div>
       
      : <>

       {onRegister ? 
       
       <Register 
       setRegisterEmail={setRegisterEmail} 
       setRegisterPassword={setRegisterPassword} 
       user={user} 
       registerEmail={registerEmail} 
       registerPassword={registerPassword}
        /> :
        <Login 
        setLoginEmail={setLoginEmail} 
        setLoginPassword={setLoginPassword} 
        user={user} 
        loginEmail={loginEmail} 
        loginPassword={loginPassword}
        />

        
       }
     

       
        </>
        }
        <br/>
      
      
      
    
    


      </div>

    
     
    </div>
  );
}

export default App;

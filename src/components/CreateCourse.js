import React, { useState } from 'react';
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase-config";

function CreateCourse({handleHome}) {
   const [title, setTitle] = useState("");
   const [description, setDescription] = useState("");

   const coursesCollectionRef = collection(db, "courses");

   const createCourse = async () => {
    await addDoc(coursesCollectionRef, {title, description, author: {name : auth.currentUser.displayName , id: auth.currentUser.uid } })
     handleHome();
   };

   
  
  return (
    <div className='cpContainer' >
           
              
    <h1>Create a Course</h1> 
     <div className='inputGp'>
          <label>Title:</label>
          <input 
     placeholder="Title..."
      onChange={(event) => {
      setTitle(event.target.value);
     }}
   />

     </div>
     <div className='inputGp'>
          <label>Description:</label>
          <input 
          
    placeholder="Description..."
    onChange={(event) => {
        setDescription(event.target.value);
   }}
  />

     </div>
     <button onClick={createCourse} >Submit</button>
    
                    
 
   
 </div>
  )

}

export default CreateCourse;
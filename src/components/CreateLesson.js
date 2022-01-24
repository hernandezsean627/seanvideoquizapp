import React, { useState } from 'react';
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase-config";

function CreateLesson({handleHome, courseId}) {
   const [videoLink, setVideoLink] = useState("");
   const [lesson, setLesson] = useState("");

   const lessonsCollectionRef = collection(db, `/courses/${courseId}/lessons`);

   const createLesson = async () => {
    await addDoc(lessonsCollectionRef, {videoLink, lesson, author: {name : auth.currentUser.displayName , id: auth.currentUser.uid } })
    handleHome();
   };
  
  return (
    <div className='cpContainer' >
           
              
    <h1>Create a Video Lesson</h1> 
     <div className='inputGp'>
          <label>Title:</label>
          <input 
     placeholder="Video link..."
      onChange={(event) => {
        setVideoLink(event.target.value);
     }}
   />

     </div>
     <div className='inputGp'>
          <label>Lesson Description:</label>
          <input 
          
    placeholder="Lesson Description..."
    onChange={(event) => {
      setLesson(event.target.value);
   }}
  />

     </div>
     <button onClick={createLesson} >Submit</button>
    
                    
 
   
 </div>
  )

}

export default CreateLesson;
import '../App.css';
import React,{ useState, useEffect } from 'react';
import {  getDocs, collection, } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import Video from "./Video";


function ViewCourse({courseId}) {
    const [videoUrl, setVideoUrl] = useState("");
    const [lessonList, setLessonList] = useState([]);
    const [openV, setOpenV] = useState(false)
    const [lessonId, setLessonId] = useState("");
    const [lessonOwner, setLessonOwner] = useState("");
    
    

    const lessonsCollectionRef = collection(db, `/courses/${courseId}/lessons`);

    useEffect(() => {
        const getLessons = async () => {
            const data = await getDocs(lessonsCollectionRef);
            setLessonList(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        };
    
        getLessons();
    }) 
    


   return (
    <div  >
        {openV ? <>
            <Video  videoUrl={videoUrl}  setVideoUrl={setVideoUrl} lessonId={lessonId} courseId={courseId} lessonOwner={lessonOwner}/>
        </> : <></>}
           
             {lessonList.map((lesson) => {
                 return (
                     <div className='post'>
                          <h2>{lesson.lesson}</h2>
                          <h3>{lesson.videoLink}</h3>
                         
                         <button onClick={() => {
                              setLessonId(lesson.id)
                              setLessonOwner(lesson.author.id)
                             setVideoUrl(lesson.videoLink)
                             setOpenV(true);
                         }}>Play Lesson</button>
                       
                       
                     </div>
                 )
             })}
   
       
 
   
   </div>
     


   );



}

export default ViewCourse;
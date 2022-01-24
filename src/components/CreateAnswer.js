import '../App.css';
import React  from 'react';
import { addDoc,  collection, } from "firebase/firestore";
import { auth, db } from "../firebase-config";

function CreateAnswer ({lessonId, courseId,  qId, answer, setAnswer, showQ, setShowQ, setShowA }) {
    

    const answersCollectionRef = collection(db, `/courses/${courseId}/lessons/${lessonId}/questions/${qId}/answers`);

    const createAnswer = async () => {
      await addDoc(answersCollectionRef, { answer,  author: {name : auth.currentUser.displayName , id: auth.currentUser.uid } })
       setShowQ(false);
       setShowA(false);
      
     };



    return (
        <button onClick={createAnswer}>
            Confirm Answer
        </button>
    )
}

export default CreateAnswer;
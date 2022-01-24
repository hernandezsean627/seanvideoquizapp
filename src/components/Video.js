import '../App.css';
import React from "react";
import { useRef, useState, useEffect } from 'react';
import YouTube from "react-youtube";

import { addDoc, getDocs, collection, } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import CreateAnswer from './CreateAnswer';



function Video({ user,  videoUrl,  setVideoUrl, lessonId, courseId , lessonOwner }) {


   
    
    const [question, setQuestion] = useState("");
    const [qNumber, setQNumber] = useState(0);
    const [answer, setAnswer] = useState("");
    const [timeCheck, setTimeCheck] = useState(0);
    const [playTime, setPlayTime] = useState(false);
    const [timer, setTimer] = useState(0);
    const [currentQ, setCurrentQ] = useState(1);
    const [start, setStart] = useState(false);
    const [showQ, setShowQ] = useState(false);
    const [showA, setShowA] = useState(false);
    const [qId, setQId] = useState("");
    

    const [questionList, setQuestionList] = useState([]);

    const questionsCollectionRef = collection(db, `/courses/${courseId}/lessons/${lessonId}/questions`);

    const createQuestion = async () => {
      await addDoc(questionsCollectionRef, {question, answer, timer : Number(timer),  qNumber: Number(qNumber) , author: {name : auth.currentUser.displayName , id: auth.currentUser.uid } })
     
     };
    
    useEffect(() => {
        const getQuestions= async () => {
            const data = await getDocs(questionsCollectionRef);
            setQuestionList(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        };
    
        getQuestions();
    }) 

   
    const [cover, setCover] = useState(true);
    const ref = useRef();
    
    let videoCode;
    if (videoUrl) {
      videoCode = videoUrl.split("v=")[1].split("&")[0];
    }
    const opts = {
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          noautoplay: -1
        }
      };
      
     
    
      function aQuestion() {
        ref.current.internalPlayer.playVideo()
        const updatedTimer = timer - qNumber;
        setCover(false);
        setTimeout(pauseVideo, updatedTimer * 850);
      }  
      function pauseVideo() {
        ref.current.internalPlayer.pauseVideo()
        setCover(true);
        setShowQ(true)
      }
     
      function getTime() {
        if (playTime) {
          setPlayTime(false)
        } else {
          setPlayTime(true)
        }
      }
      function assignTime() {
        setTimer(timeCheck)
      }
      function overlay() {
         if (cover) {
             setCover(false);
         } else {
          setCover(true);
        }
      }

     

        const checkElapsedTime = (e) => {
        
          console.log(e.target.playerInfo.playerState);
          console.log(e.target.getCurrentTime());
          const currentTime = e.target.getCurrentTime();
          if (playTime) {
            setTimeCheck(currentTime);
                    
          }
  
          
        };


     
    
   

    
    


   return (
    <div className='genDiv' >
       
       {auth.currentUser.uid === lessonOwner ? <>
       
     
        <div  className='inputGp' >
          <label>URL</label>
           <input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
        </div>
        <div  className='inputGp' >
        <label>Question Number</label>
           <input  type="number" value={qNumber} onChange={(e) => setQNumber(e.target.value)} /> 
        </div>
        <div  className='inputGp' >
        <label>Question</label>
           <input value={question} onChange={(e) => setQuestion(e.target.value)} /> 
        </div>
        <div  className='inputGp' >
        <label>Answer</label>
           <input value={answer} onChange={(e) => setAnswer(e.target.value)} /> 
        </div>
        <div  className='inputGp' >
        <label>How many seconds pass before asking?</label>
           <input  type="number" value={timer} onChange={(e) => setTimer(e.target.value)} /> 
        </div>
        {playTime ? 
        < >
        <div  className='inputGp' >
        <label>CurrentTime</label>
          <h1>{timeCheck}</h1>
         
        </div>
        <button onClick={assignTime}>assignTime</button>
        </>
        
        : <></>}
         
         </> : <></>}

         
      <div>
               <hr />        
       
            <div id="video_box" className='container'>
                {cover ?
            <div id="video_overlays">
               <div  id="whiteOne">
               {questionList.map((q) => {
                return (
                  <>
                  {currentQ === q.qNumber ? <>
                    <div>
                      {start ? <>
                        
                        {showQ ? <>    
                          {showA ? <>
                             <h4>{answer}</h4>
                            <CreateAnswer setShowA={setShowA} showQ={showQ}  setShowQ={setShowQ} lessonId={lessonId} courseId={courseId} qId={qId} answer={answer} setAnswer={setAnswer} />
                            <button onClick={() => {
                              setShowA(false)
                            }} >Cancel</button>
                          </> : <>
                          
                         

                          <h4  >{q.question}</h4>
                          <input value={answer} onChange={(e) => setAnswer(e.target.value)} /> 
                         
                          <button onClick={() => {
                            setShowA(true)
                           
                        setCurrentQ(currentQ +  1);
                      }}>submit Answer</button>
                      </>}
                        </> : <>
                        <h2>Are you sure?</h2>
                        <button onClick={aQuestion}>Yes</button>
                        <button onClick={() => {setStart(false)}}>No</button>

                        
                        </>}
                      
                      </> : 
                    <h2 onClick={() => {
                       setQuestion(q.question);
                       setTimer(q.timer);
                       setQNumber(q.qNumber)
                       setQId(q.id)
                       setStart(true);
                    }}> {currentQ > 1 ? <>Next Question</> : <>Start</>}  </h2> }
                  </div>
                  
                  </> : <> </>}
                 
                  </>
                )
              })}
               </div>
            </div> 
            : <></>
            }
          <YouTube
          className='responsive-iframe'
            videoId={videoCode}
            containerClassName="embed embed-youtube"
            onStateChange={(e) => checkElapsedTime(e)}
            opts={opts}
            ref={ref}
           
          />
          </div>
         
         {videoUrl ? 
          <>
         
          <button onClick={aQuestion}>Set a Question</button>
          <button onClick={getTime}>Set Time</button>
          <button onClick={overlay}>overlay</button>
        
          <button  onClick={createQuestion} >Create Question</button>
          </>
         : <></>}
          
          
      </div>   
              
 
     
 
   
   </div>
     


   );



}

export default Video;



import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore} from 'firebase/firestore';


const firebaseConfig = {

    apiKey: process.env.REACT_APP_API_KEY,
  
    authDomain: process.env.REACT_APP_Auth_Domain,
  
    projectId: process.env.REACT_APP_Project_Id,
  
    storageBucket: process.env.REACT_APP_Storage_Bucket,
  
    messagingSenderId: process.env.REACT_APP_Messaging_Sender_Id,
  
    appId: process.env.REACT_APP_AppId,
  
    measurementId: process.env.REACT_APP_Measurement_Id
  
  };
  
  const app = initializeApp(firebaseConfig);

  export const db = getFirestore(app)

  export const auth = getAuth(app)


import { 
    signInWithEmailAndPassword,
    GoogleAuthProvider, signInWithPopup
 
} from "firebase/auth";
import '../App.css';
import { auth } from "../firebase-config";

function Login({setLoginEmail, setLoginPassword, user, loginEmail, loginPassword}) {

    const login = async () => {
   
        try {
          const user = await signInWithEmailAndPassword( 
            auth, 
            loginEmail, 
            loginPassword 
          ).then(() => {
            
            setLoginEmail("");
            setLoginPassword("")
          });
          
          console.log(user) 
        } catch (error) {
          console.log(error.message);
        }
    
      };

      const provider = new GoogleAuthProvider();

      const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
          
            const name = result.user.displayName
            const email = result.user.email;
            const profilePic = result.user.photoURL;
    
            localStorage.setItem("name", name)
            localStorage.setItem("email", email)
            localStorage.setItem("profilePic", profilePic)
        }).catch((error) => {
            console.log(error);
        });
      }



   return (
    <div className='cpContainer' >
           
              
    <h1>Login</h1> 
     <div className='inputGp'>
          <label>Email:</label>
          <input 
     placeholder="Email..."
      onChange={(event) => {
      setLoginEmail(event.target.value);
     }}
   />

     </div>
     <div className='inputGp'>
          <label>Password:</label>
          <input 
          type = "password"
    placeholder="Password..."
    onChange={(event) => {
    setLoginPassword(event.target.value);
   }}
  />

     </div>
     <button onClick={login} >Submit</button>
     <hr />
     <button className="login-with-google-btn" onClick={signInWithGoogle}>Sign in with Google</button>
                    
 
   
 </div>
     


   );



}

export default Login;
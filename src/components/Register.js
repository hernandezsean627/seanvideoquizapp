import { 
    createUserWithEmailAndPassword
 
} from "firebase/auth";
import '../App.css';
import { auth } from "../firebase-config";

function Register({setRegisterEmail, setRegisterPassword, user, registerEmail, registerPassword}) {

    const register = async () => {

        try {
          const user = await createUserWithEmailAndPassword( 
            auth, 
          
            registerEmail, 
            registerPassword 
          );
          console.log(user) 
        } catch (error) {
          console.log(error.message);
        }
        
    };
    

    return (
    <div className='cpContainer'>
    <h3> Register User</h3>
     
      <div className='inputGp'>
                     <label>Email:</label>
                <input 
                value={registerEmail}
                placeholder="Email..."
                 onChange={(event) => {
                 setRegisterEmail(event.target.value);
                }}
              />

                </div>
                <div className='inputGp'>
                     <label>Password:</label>
                     <input 
                     value={registerPassword}
                     type = "password"
               placeholder="Password..."
               onChange={(event) => {
               setRegisterPassword(event.target.value);
              }}
             />

                </div>

      <button onClick={register}>Create User</button>
   </div>
    )
}

export default Register;
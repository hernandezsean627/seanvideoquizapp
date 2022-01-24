import '../App.css';


function Home({ user }) {

    


   return (
    <div className='post' >
           
              
 
     <h1>Welcome Home</h1> 
     <h3>{user?.displayName}</h3>
 
   
   </div>
     


   );



}

export default Home;
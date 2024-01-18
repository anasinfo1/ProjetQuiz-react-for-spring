import { useState } from "react"
import './Login.css'

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const loginHnadller= async(e)=>{
        e.preventDefault();
        try{
            const response = await fetch('http://localhost:3000/users/login',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({username,password})
            });
            const data = await response.json();
            if(data.success === true){
                const UserId = data.user.id; //changes=> spring : id | express : _id
                const fullName = data.user.fullName;
                const username = data.user.username;
                const role = data.user.role;
                if(data.token){
                    const token = data.token;
                    localStorage.setItem('token',token);
                    console.log(token);
                }
             
                localStorage.setItem('UserId',UserId);
                localStorage.setItem('fullName',fullName);
                localStorage.setItem('username',username);
                localStorage.setItem('role',role);
                localStorage.setItem('isLoggedIn',true);
                console.log(fullName," ", role);
                
                
                alert('Login Successful');
                if(role === 'prof'){
                    window.location.href='/profquizzes';
                }else if(role === 'student'){
                    window.location.href='/studentquizzes';
                }
               

                
            }else{
                setError(data.message);
            }
        }catch(err){console.log(err);}

    }

  return (
    <>
        <h2>Login to your account</h2>
        <form onSubmit={loginHnadller}>
            <input type="text" placeholder="username" value={username} onChange={(e)=>{setUsername(e.target.value)}} /><br></br>
            <input type="password" placeholder="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} /><br></br>
            <button type="submit">Login</button>
        </form>
        {error && <p className="error">{error}</p> }
    </>
  )
}

export default Login
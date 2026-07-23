import {useState,useEffect} from 'react'
import {Link,useNavigate} from 'react-router-dom'
export default function Signin(){
    const [username ,setUsername]= useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function signin(){
        const obj = {
            username,
            password
        }
        const res = await fetch(`${import.meta.env.VITE_API_URL}/app/v1/signin`,{
            method: "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(obj)

        })

        const response = await res.json();
        
        const token = response.token;
        localStorage.setItem('token',token);
        navigate("/");
        console.log(response);
    }
    return(
        <div className = " h-screen ">
                    <div className = "p-10 text-3xl font-semibold ">Welcome Back</div>
                    <div>
                        <div className = "p-5 text-lg font-semibold ">
                            <div>Username</div>
                            <input onChange ={(e)=>{setUsername(e.target.value)}} className ="w-sm h-10 bg-[#faf2de] border border-gray-400 hover:border-gray-600 font-light text-base p-5 " placeholder ="You@example.com"></input>
                        </div>
                        
                      
                        
                        <div className = "p-5 text-lg font-semibold ">
                            <div>Password</div>
                            <input onChange ={(e)=>{setPassword(e.target.value)}} className ="w-sm h-10 bg-[#faf2de] border border-gray-400 hover:border-gray-600 font-light text-base p-5"  placeholder = "Minimum 6 characters " type = "password"></input>
                        </div>
                        <button onClick = {()=>{signin()}} className = "w-sm h-10 bg-black text-white m-5 rounded-sm transition-transform duration-200 hover:scale-105">Sign in  &#8594;</button>
                        <div className = "flex justify-start m-5">
                            <div>Don't have an account? </div>
                            <Link to="/signup" className ="underline font-bold transition-transform duration-200  hover:scale-105">Sign Up</Link>
                        </div>
                    </div>
                    
                </div>
    )
}
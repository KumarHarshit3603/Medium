import {Link,useNavigate} from 'react-router-dom'
import {useState} from 'react'
export function Signup(){
        const [Name,setName] =useState("");
        const [Email,setEmail] =useState("");
        const [Username,setUsername] =useState("");
        const [Password,setPassword] =useState("");

        const navigate = useNavigate();

       async function send_data(){
            const obj = {
                name:Name,
                email:Email,
                username:Username,
                password:Password
            }
            const res = await fetch(`${import.meta.env.VITE_API_URL}/app/v1/signup`,{
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(obj)
            })
            const response = await res.json();

            const token = response.token;

            localStorage.setItem('token',token);
            navigate("/");
            console.log(response);
        }
        return(
            <>
                <div className = "h-screen ">
                    <div className = "p-10 text-3xl font-semibold ">Create Your Account</div>
                    <div>
                        <div className = "p-5 text-lg font-semibold ">
                            <div >Name</div>
                            <input onChange={(e)=>{setName(e.target.value)}}className ="w-sm h-10 bg-[#faf2de] border border-gray-400 hover:border-gray-600 text-md font-light text-base p-5" placeholder ="Jaden Smith"></input>
                        </div >
                        
                        <div  className = "p-5 text-lg font-semibold ">
                            <div>Email</div>
                            <input onChange={(e)=>{setEmail(e.target.value)}} className ="w-sm h-10 bg-[#faf2de] border border-gray-400 hover:border-gray-600 font-light text-base p-5 " placeholder ="You@example.com"></input>
                        </div>
                        
                        <div className = "p-5 text-lg font-semibold ">
                            <div>Username</div>
                            <input onChange={(e)=>{setUsername(e.target.value)}} className ="w-sm h-10 bg-[#faf2de] border border-gray-400 hover:border-gray-600 font-light text-base p-5"  placeholder = "user123"/>
                        </div>
                        
                        <div  className = "p-5 text-lg font-semibold ">
                            <div>Password</div>
                            <input onChange={(e)=>{setPassword(e.target.value)}} className ="w-sm h-10 bg-[#faf2de] border border-gray-400 hover:border-gray-600 font-light text-base p-5" type = "password" placeholder = "Minimum 6 characters " />
                        </div>
                        <button onClick={()=>{send_data()}} className = "w-sm h-10 bg-black text-white m-5 rounded-sm transition-transform duration-200 hover:scale-105">Create account &#8594;</button>
                        <div className = "flex justify-start m-5">
                            <div>Already have an account? </div>
                            <Link to="/signin" className ="underline font-bold transition-transform duration-200  hover:scale-105">Sign in</Link>
                        </div>
                    </div>
                    
                </div>
            </>
        )
}
export default Signup;
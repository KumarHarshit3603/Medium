import {Link} from 'react-router-dom'
export default function Signin(){
    return(
        <div className = " h-screen ">
                    <div className = "p-10 text-3xl font-semibold ">Welcome Back</div>
                    <div>
                        <div className = "p-5 text-lg font-semibold ">
                            <div>Email</div>
                            <input className ="w-sm h-10 bg-[#faf2de] border border-gray-400 hover:border-gray-600 font-light text-base p-5 " placeholder ="You@example.com"></input>
                        </div>
                        
                      
                        
                        <div className = "p-5 text-lg font-semibold ">
                            <div>Password</div>
                            <input className ="w-sm h-10 bg-[#faf2de] border border-gray-400 hover:border-gray-600 font-light text-base p-5"  placeholder = "Minimum 6 characters " type = "password"></input>
                        </div>
                        <button className = "w-sm h-10 bg-black text-white m-5 rounded-sm transition-transform duration-200 hover:scale-105">Sign in  &#8594;</button>
                        <div className = "flex justify-start m-5">
                            <div>Don't have an account? </div>
                            <Link to="/signup" className ="underline font-bold transition-transform duration-200  hover:scale-105">Sign Up</Link>
                        </div>
                    </div>
                    
                </div>
    )
}
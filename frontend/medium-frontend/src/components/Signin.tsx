export default function Signin(){
    return(
        <div className = " h-screen ">
                    <div className = "p-10 text-3xl font-semibold ">Welcome Back</div>
                    <div>
                        <div className = "p-5 text-lg font-semibold ">
                            <div>Email</div>
                            <input className ="w-sm h-10 bg-[#faf2de] border border-gray-400 font-light text-base p-5 " placeholder ="You@example.com"></input>
                        </div>
                        
                      
                        
                        <div className = "p-5 text-lg font-semibold ">
                            <div>Password</div>
                            <input className ="w-sm h-10 bg-[#faf2de] border border-gray-400 font-light text-base p-5"  placeholder = "Minimum 6 characters " type = "password"></input>
                        </div>
                        <button className = "w-sm h-10 bg-black text-white m-5 rounded-sm">Sign in  &#8594;</button>
                        <div className = "flex justify-center m-5">
                            <div>Already have an account? </div>
                            <div>Sign in</div>
                        </div>
                    </div>
                    
                </div>
    )
}
export function Signup(){
        return(
            <>
                <div className = " h-screen ">
                    <div className = "p-10 text-3xl font-semibold ">Create Your Account</div>
                    <div>
                        <div className = "p-5 text-lg font-semibold ">
                            <div >Name</div>
                            <input className ="w-sm h-10 bg-[#faf2de] border border-gray-400 text-md font-light text-base p-5" placeholder ="Jaden Smith"></input>
                        </div >
                        
                        <div className = "p-5 text-lg font-semibold ">
                            <div>Email</div>
                            <input className ="w-sm h-10 bg-[#faf2de] border border-gray-400 font-light text-base p-5 " placeholder ="You@example.com"></input>
                        </div>
                        
                        <div className = "p-5 text-lg font-semibold ">
                            <div>Username</div>
                            <input className ="w-sm h-10 bg-[#faf2de] border border-gray-400 font-light text-base p-5"  placeholder = "user123"></input>
                        </div>
                        
                        <div className = "p-5 text-lg font-semibold ">
                            <div>Password</div>
                            <input  className ="w-sm h-10 bg-[#faf2de] border border-gray-400 font-light text-base p-5" type = "password" placeholder = "Minimum 6 characters "  ></input>
                        </div>
                        <button className = "w-sm h-10 bg-black text-white m-5 rounded-sm">Create account &#8594;</button>
                        <div className = "flex justify-center m-5">
                            <div>Already have an account? </div>
                            <div>Sign in</div>
                        </div>
                    </div>
                    
                </div>
            </>
        )
}
export default Signup;
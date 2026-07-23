import Signup from '../components/Signup'
import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
export default function Signuppage(){
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(()=>{

            if(token){
                async function auth_request(){
                    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth`,{
                        headers:{
                            Authorization: `Bearer ${token}` 
                        }
                    })
                    const response = await res.json();
                    console.log(response.value);
                    
                    if(response.value){
                        navigate("/");
                    }
                }
                auth_request();
            }
    },[navigate])

    return(
        <>
            <div className =" flex justify-around h-screen">
                <div className = "min-w-lg w-1/2 p-20 hidden lg:block    bg-[#d9ceb4] whitespace-pre">
                    <div className = "pb-10 font-light">P R O S E   /   J O I N</div>
                    <div>
                        <div className ="pt-2 text-black text-6xl font-bold">Start</div>
                        <div className ="pt-2 text-[rgb(200,98,42)] text-6xl">telling</div>
                        <div className ="pt-2 text-black text-6xl font-bold">your story</div>
                    </div>
                    <div className = "pt-30 text-gray-600">
                        <div className ="pb-10 flex items-center ">
                            <div className = "h-2 w-2 m-1 bg-red-700 rounded-full flex justify-center flex-col"></div>
                            <div>Publish to a thoughtful audience</div>
                        </div>
                        
                        <div className ="pb-10 flex items-center ">
                            <div className = "h-2 w-2 m-1 bg-red-700 rounded-full"></div>
                            <div>Clean, distraction-free editor</div>
                        </div>
                        
                        <div className ="pb-10 flex items-center ">
                            <div className = "h-2 w-2 m-1 bg-red-700 rounded-full"></div>
                            <div>Analytics that respect privacy</div>
                        </div>

                    </div>
                </div>
                <div className = "min-w-lg  w-screen   lg:w-1/2 flex justify-center flex-col items-center bg-[#f8f6f1] ">
                    <Signup></Signup>
                </div>
            </div>
        </>
    )
}
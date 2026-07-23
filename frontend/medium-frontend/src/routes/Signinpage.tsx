import Signin from '../components/Signin'
import {useNavigate} from 'react-router-dom'
import {useEffect} from 'react'
export default function Signinpage(){

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
           <div className = "flex justify-center">
                 <div className = "hidden  min-w-md w-1/2 bg-[url(emil-widlund-xrbbXIXAWY0-unsplash.avif)]   bg-cover text-white lg:flex flex-col justify-around p-5">
                        <div className = "pb-10 font-light">P R O S E </div>
                         <div>
                            <div className ="pt-2 text-white text-6xl font-bold">Where ideas</div>
                            <div className ="pt-2 text-white text-6xl">find their voice</div>
                            <div className ="pt-2 text-gray-200 text-lg">A publishing platform built for writers who care about the craft</div>
                         </div>
                 </div>
                 <div className = "min-w-md w-screen lg:w-1/2 flex justify-center flex-col items-center bg-[#f8f6f1] ">
                        <Signin></Signin>
                </div>
           </div>
        </>
    )
}
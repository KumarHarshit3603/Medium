import {useState,useEffect} from 'react'
import Blog from '../components/blog'
export default function Blogpage(){
    const blogid=5;
    const [blogdata,setblogdata] = useState("");

        useEffect(()=>{
            async function getblogdata(){
                    const res = await fetch(`${import.meta.env.VITE_API_URL}/app/v1/blog/${blogid}`,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }).then((data)=>data.json()).then((data)=>{setblogdata(data)})
                
            }
            getblogdata();
    },[])


    return(
        <>  
            
            <div className = "m-10">
                {/*@ts-ignore*/}
                <div className = "flex justify-center text-4xl font-semibold p-5 m-5">{blogdata.title}</div>
                <Blog blogdata = {blogdata}/>
            </div>
        </>
    )
}
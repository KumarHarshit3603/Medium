import {useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Blog from '../components/blog'
export default function Blogpage(){
    const blogid=useParams().id;
    const [blogdata,setblogdata] = useState("");

        useEffect(()=>{
            async function getblogdata(){
                    const res = await fetch(`${import.meta.env.VITE_API_URL}/app/v1/blog/${blogid}`,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }).then((data)=>data.json()).then((data)=>{setblogdata(data)})
                if(res===null)console.log("oye nahi hai guru")
            }
           
            getblogdata();
    },[])


    return(
        <>  
            
            <div >
                {/*@ts-ignore*/}
                <div className = "flex justify-center text-4xl font-semibold p-5 border-b-2">{blogdata.title}</div>
                <Blog blogdata = {blogdata}/>
            </div>
        </>
    )
}
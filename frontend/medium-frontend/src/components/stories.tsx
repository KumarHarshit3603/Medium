import {useState , useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Card from './card'
export default function Stories(){
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

        type Blog = {
        id: number;
        title: string;
        content: string;
        username: string;
    };
    const [blogs,setblogs] =useState<Blog[]>([]);
    function timecalc(text:string){
        const words = text.trim().split(/\s+/);
        const readingspeed = 200;
        return Math.ceil(words.length/readingspeed);
    }

    function getfirstwords(text:string){
        const words = text.trim().split(/\s+/);
        const wordcount = 40;
        if(words.length<wordcount){
            return words.join(" ") + "...";
        }

        return words.slice(0,wordcount).join(" ") + "...";
    }
    
    async function getblogs(){
        const res = await fetch(`${import.meta.env.VITE_API_URL}/app/v1/blogs`,{
            headers:{
                            Authorization: `Bearer ${token}` 
                        }
        });
        const blogs = await res.json();
        
        if(blogs.value){
            navigate('/signin');
        }
        console.log(blogs);
        
        setblogs(blogs);
    }
    useEffect(()=>{
        getblogs();
       
    },[]);

    return(
        <>
            <div className = "ml-100">
                <div className = "p-3 m-5 text-6xl font-bold ">All Stories</div>
                <div>
                    <input placeholder = "Search by title, author, or topic" className = "m-8 p-2 h-10 w-100 bg-white border border-gray-400"></input>
                </div>
                {
                    blogs.map((cardobj)=>{
                        return <Card key ={cardobj.id} cardobj = {cardobj} timecalc ={timecalc} getfirstwords = {getfirstwords}/>
                    })
                }
            </div>
        </>
    )
}
import {useState , useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Card from './card'
import Skeleton from "../components/blogloadingskeleton"
export default function Stories(){
    const [loading,setloading] = useState(false);
    const [keyword,setkeyword] = useState("");
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
    function getfirstwords(content: string) {
        const maxLength = 150;
    try {
        const data = JSON.parse(content);

        let text = "";

        for (const block of data.blocks ?? []) {
        if (block.type === "paragraph" || block.type === "header") {
            text += `${block.data.text} `;
        }

        if (block.type === "quote") {
            text += `${block.data.text} `;
        }

        if (block.type === "list" || block.type === "checklist") {
            for (const item of block.data.items ?? []) {
            text += `${item.content ?? item.text ?? ""} `;
            }
        }

        if (block.type === "table") {
            for (const row of block.data.content ?? []) {
            text += `${row.join(" ")} `;
            }
        }

        if (block.type === "code") {
            text += `${block.data.code} `;
        }

        if (text.length >= maxLength) {
            break;
        }
        }

        text = text
        .replace(/<[^>]*>/g, "")
        .replace(/&nbsp;/g, " ")
        .replace(/\s+/g, " ")
        .trim();

        return text.length > maxLength
        ? text.slice(0, maxLength) + "..."
        : text;
    } catch {
        return "";
    }
    }
    // function getfirstwords(text:string){
    //     const words = text.trim().split(/\s+/);
    //     const wordcount = 40;
    //     if(words.length<wordcount){
    //         return words.join(" ") + "...";
    //     }

    //     return words.slice(0,wordcount).join(" ") + "...";
    // }
    
    async function getblogs(){
        setloading(true);
        
        const res = await fetch(`${import.meta.env.VITE_API_URL}/app/v1/blogs?keyword=${keyword}`,{
            headers:{
                            Authorization: `Bearer ${token}` 
                        }
        });
        
        setloading(false);
        const blogs = await res.json();
        
        if(blogs.value){
            navigate('/signin');
        }
        console.log(blogs);
        
        setblogs(blogs);
    }
    useEffect(()=>{
        getblogs();
       
    },[keyword]);

    let TimeoutId:number;
    function debouncingFunction(keyword:string){

        if(TimeoutId)clearTimeout(TimeoutId);
        TimeoutId = setTimeout(()=>{
            setkeyword(keyword);
        },500)

    }
    return(
        <>
        
            <div className = "w-1/2">
                <div className = "p-3 m-5 text-6xl font-bold ">All Stories</div>
                <div>
                    <input placeholder = "Search by title, author, or topic" className = "m-8 p-2 h-10 w-100 bg-white border border-gray-400" onChange = {(e)=>{debouncingFunction(e.target.value)}}></input>
                </div>
                {
                loading==true?(
                        <>
                        <Skeleton/>
                        <Skeleton/>
                        <Skeleton/>
                        <Skeleton/>
                        <Skeleton/>
                        <Skeleton/>
                        </>
                    
                ):
                
                    (
                    blogs.map((cardobj)=>{
                        return <Card key ={cardobj.id} cardobj = {cardobj} timecalc ={timecalc} getfirstwords = {getfirstwords} id ={cardobj.id}/>
                    })
                    )
                
                }
            </div>
        </>
    )
}
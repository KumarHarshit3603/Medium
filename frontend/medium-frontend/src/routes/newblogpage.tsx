import Editor from '../components/editor'
import {useState} from 'react'
export default function Newblog(){
    const [title,settitle] = useState("");
    return(
        <>
        <div className = "flex bg-[#d9ceb4]  justify-center ">
            <input placeholder = "title" className = "text-xl w-1/2 bg-gray-200 rounded" onChange = {(e)=>{settitle(e.target.value)}}></input>
            <button className = "bg-black text-white text-xl p-2 rounded">publish</button>
        </div>
        <Editor title = {title}/>
        </>
    )
}
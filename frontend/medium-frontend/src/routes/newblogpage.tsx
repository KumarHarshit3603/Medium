import Editor from '../components/editor'
import {useState,useRef} from 'react'
export default function Newblog(){
    const [title,settitle] = useState("");
    return(
        <>
        <Editor title = {title}/>
        </>
    )
}
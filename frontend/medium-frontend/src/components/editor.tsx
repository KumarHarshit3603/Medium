import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import List from '@editorjs/list'
import NestedList from '@editorjs/nested-list'
import Checklist from '@editorjs/checklist'
import Image from '@editorjs/image'
import SimpleImage from '@editorjs/simple-image'
import Link from '@editorjs/link'
import Table from '@editorjs/table'
import Code from '@editorjs/code'

import {useState, useEffect,useRef} from 'react'
import {useNavigate} from 'react-router-dom'
export default function Editor(props:any){
    
    const navigate = useNavigate();
    const editorRef = useRef<EditorJS | null>(null)

    useEffect(()=>{
            const editor = new EditorJS({
            holder: 'editor',
            tools:{
                header: Header,
                quote:Quote,
                list:List,
                // nestedlist:NestedList,
                // image:Image,
                // simpleimage:SimpleImage,
                link:Link,
                table:Table,
                code:Code,

            }
        })
        editorRef.current = editor;

        return(()=>{
            editor.destroy();
        });
    },[])

    const savepost  = async ()=>{

        const data = await editorRef.current!.save();
        const strdata = JSON.stringify(data);
        console.log(strdata);
        
        const username = localStorage.getItem('username');
        if(!username){
            localStorage.clear();
        }
        const res =  await fetch(`${import.meta.env.VITE_API_URL}/app/v1/blog`,{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `bearer ${localStorage.getItem('token')}`
            },
            body:JSON.stringify({
                content: strdata,
                title: props.title,
                username : localStorage.getItem('username')
            })
        })
        const response = await res.json();
        if(response.value){
            // console.log("unauthenticated");
            navigate('/')
        }
        else{
            console.log(response);
            navigate('/')
        }

    }
    return(
        <>
            <div id = "editor" className = "bg-[#f8f6f1]"></div>
            <button onClick = {()=>{savepost()}}>publish</button>

        </>
    )
}
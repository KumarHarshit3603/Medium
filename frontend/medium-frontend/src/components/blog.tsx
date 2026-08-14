import {useEffect,useRef} from 'react'
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


export default function Blog(props:any){
    const blogdata = props.blogdata;
    const editorRef = useRef<EditorJS | null>(null)

    useEffect(()=>{
            if(!blogdata)return;
            console.log(blogdata);
            const editor = new EditorJS({
            holder: 'editor',
            readOnly : true,
            data: JSON.parse(blogdata.content),
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
    },[blogdata])

    return(
        <>
            <div id = "editor" className = "m-10"></div>
           
        </>
    )
}
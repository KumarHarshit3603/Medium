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

import {useState, useEffect} from 'react'


export default function Editor(){
        
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

        // return(()=>{
        //     editor.destroy();
        // });
    },[])
    return(
        <div className = "prose max-w-none">
            <div id = "editor"></div>
        </div>
    )
}
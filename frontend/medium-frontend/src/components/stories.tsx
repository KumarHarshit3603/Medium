import {useState , useEffect} from 'react'
import Card from './card'
export default function Stories(){
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
        const blogs = await fetch(`${import.meta.env.VITE_API_URL}/app/v1/blogs`);
        console.log(blogs);
        return blogs;
    }
    useEffect(()=>{
       const blogs =  getblogs()
       
    },[]);
    const mockobj = {
        username : "mockusername",
        title: "mock title",
        content: "In the quiet hours of the morning, before the streets become crowded and the noise of daily life fills the air, there is a unique sense of calm that encourages reflection and creativity. Many people find that this is the perfect time to read, write, or simply organize their thoughts. A good book, a warm cup of coffee, and a comfortable chair can transform an ordinary morning into an experience that feels both productive and peaceful. Technology has made information more accessible than ever before, allowing anyone with an internet connection to learn new skills, explore different cultures, and communicate with people across the globe. Despite these advantages, it is still important to take occasional breaks from screens and spend time outdoors. Walking through a park, listening to birds, or watching the changing colors of the sky can provide a refreshing perspective that is difficult to find in front of a computer monitor. Progress is often the result of consistent effort rather than dramatic moments of inspiration. Small improvements made every day eventually accumulate into meaningful achievements, whether the goal is learning a programming language, improving physical fitness, mastering a musical instrument, or developing better communication skills. Challenges and setbacks are an inevitable part of any worthwhile journey, but they also present valuable opportunities to learn and adapt. People who embrace curiosity and remain willing to experiment are often the ones who discover innovative solutions to difficult problems. Collaboration further amplifies these possibilities because diverse perspectives can reveal ideas that a single individual might overlook. The ability to listen carefully, ask thoughtful questions, and remain open to constructive feedback is just as important as technical expertise. In the end, success is rarely defined by a single accomplishment. Instead, it is built through patience, persistence, continuous learning, and the willingness to improve one step at a time while helping others along the way."

    }
    return(
        <>
            <div>
                <div className = "m-5 text-6xl font-bold ">All Stories</div>
                <div>
                    <input placeholder = "Search by title, author, or topic" className = "m-5 p-2 h-10 w-100 bg-white border border-gray-400"></input>
                </div>
                <Card mockobj = {mockobj} timecalc ={timecalc} getfirstwords = {getfirstwords}/>
            </div>
        </>
    )
}
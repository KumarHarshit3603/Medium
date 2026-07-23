import {useNavigate} from 'react-router-dom'

export default function Card(props:any){
    const navigate = useNavigate()
    return(
        <button onClick = {()=>{navigate("/blogpage")}} className = "p-3 m-5 w-4/5 bg-[#f8f6f1] border-b border-gray-300 text-left">
                        <div className = "p-2 text-2xl font-semibold">{props.cardobj.title}</div>
                        <div className = "p-2 text-md font-light text-gray-500">{props.getfirstwords(props.cardobj.content)}</div>
                        <div className = "p-2 flex justify-between font-light">
                            <div className = "flex justify-start">
                                    <div className = "w-5 h-5 bg-[url(/user.png)] bg-cover"></div>
                                    <div>{props.cardobj.username}</div>
                            </div>
                            <div>{props.timecalc(props.cardobj.content)} min read</div>

                        </div>
        </button>
    )
}
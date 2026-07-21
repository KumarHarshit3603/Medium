export default function Card(props:any){
    return(
        <div className = "p-3 m-5 w-4/5 bg-[#f8f6f1] border-b border-gray-300 ">
                        <div className = "p-2 text-2xl font-semibold">{props.mockobj.title}</div>
                        <div className = "p-2 text-md font-light text-gray-500">{props.getfirstwords(props.mockobj.content)}</div>
                        <div className = "p-2 flex justify-between font-light">
                            <div className = "flex justify-start">
                                    <div className = "w-5 h-5 bg-[url(/user.png)] bg-cover"></div>
                                    <div>{props.mockobj.username}</div>
                            </div>
                            <div>{props.timecalc(props.mockobj.content)} min read</div>

                        </div>
        </div>
    )
}
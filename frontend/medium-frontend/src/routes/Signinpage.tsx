import Signin from '../components/Signin'
export default function Signinpage(){
    return(
        <>
           <div className = "flex justify-center">
                 <div className = "w-1/2 bg-[url(emil-widlund-xrbbXIXAWY0-unsplash.jpg)]  bg-cover text-white flex flex-col justify-around p-5">
                        <div className = "pb-10 font-light">P R O S E </div>
                         <div>
                            <div className ="pt-2 text-white text-6xl font-bold">Where ideas</div>
                            <div className ="pt-2 text-white text-6xl">find their voice</div>
                            <div className ="pt-2 text-gray-400 text-lg">A publishing platform built for writers who care about the craft</div>
                         </div>
                 </div>
                 <div className = "flex justify-center flex-col items-center bg-[#f8f6f1] w-1/2">
                        <Signin></Signin>
                </div>
           </div>
        </>
    )
}
  import {Link,useNavigate} from 'react-router-dom'
  import Stories from '../components/stories'
  export default function Home(){
    const navigate = useNavigate();
    return(
        <>
            <div  className = "bg-[#f8f6f1] min-h-screen w-screen">
                    
                    <div className ="flex justify-around bg-[#f8f6f1] h-15 border border-b-gray-300">
                        <div className ="flex justify-between">
                            <div className = "p-5 bg-[url(/logo.svg)] bg-cover"></div>
                            <div className = "p-5">PROSE</div>

                        </div>
                        <div className ="flex justify-between items-center w-100">
                            <button className = "p-5">Explore</button>
                            <button className = "p-2 bg-black text-white rounded-sm" onClick = {()=>{navigate('/newblog')}}>+ Write </button>
                            <div className ="px-3">
                                <button className = "w-10 h-10 bg-[url(/user.png)] bg-cover"></button>
                            </div>
                            <button className = "h-5 w-5 bg-[url(/noun-logout-541763.svg)] bg-cover" onClick ={()=>{
                                console.log('clicked')
                                localStorage.removeItem('token');
                                localStorage.removeItem('username');
                                navigate('/Signin')
                            }}></button>

                        </div>
                    </div>

                    <div className = "flex justify-center ">
                        <Stories/>
                    </div>
            </div>
        </>
    )
  }
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import Signuppage from './routes/Signuppage'
import Signinpage from './routes/Signinpage'
import Home from './routes/Homepage'
import Blogpage from './routes/blogpage'
import Newblog from './routes/newblogpage'
export default function App(){
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path = "/Signup" element = {<Signuppage></Signuppage>}></Route>
          <Route path = "/Signin" element = {<Signinpage></Signinpage>}></Route>
          <Route path = "/" element = {<Home/>}/>
          <Route path = "/blogpage" element = {<Blogpage></Blogpage>}/>
          <Route path = "/newblog" element = {<Newblog></Newblog>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}
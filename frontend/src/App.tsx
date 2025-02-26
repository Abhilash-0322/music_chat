import { Routes,Route } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import AuthCallbackPage from './pages/auth-callback/AuthCallbackPage'
// import { axiosInstance } from './lib/axios'

function App() {
  // const getSomeData=async()=>{
  //     const res=await axiosInstance.get('/users',{
  //       headers:{
  //         "Authorization":`Bearer ${token}`,
  //         // 'Content-Type':'application/json'
  //       }
  //     })
  //     console.log(res.data);
  // }

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path='/auth-callback' element={<AuthCallbackPage/>}/>
      </Routes>
    </>
      
  )
}

export default App
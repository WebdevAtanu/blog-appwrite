import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Header from './component/Header';
import Home from './component/Home';
import Editor from './component/Editor';
import Posts from './component/Posts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/post' element={<Posts/>}/>
      <Route path='/dashboard' element={<Editor/>}/>
    </Routes>
    </BrowserRouter>
    <ToastContainer
      position="top-center"
      autoClose={2000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover
      theme="dark"
      transition: Bounce
      />
    </>
  )
}

export default App

import React,{useState,useEffect} from 'react';
import './App.css'
import Header from './component/Header';
import Blogpost from './component/Blogpost';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Context from './context/Context';
import {account} from './config/appwrite';
import {BrowserRouter,Routes,Route} from 'react-router-dom';

function App() {
  const [flag,setFlag]=useState(false);
    const check = async() => {
        try {
            const session = await account.getSession('current');
            console.log('Active session:', session);
            setFlag(true);
        } catch (error) {
            console.error('No active session:', error.message);
            setFlag(false);
        }
    }
    useEffect(() => {
        check();
    }, [flag])
  
  return (
    <>
    <Context.Provider value={{flag,setFlag}}>
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Header/>}/>
            <Route path='/blogpost' element={<Blogpost/>}/>
        </Routes>
    </BrowserRouter>
    </Context.Provider>
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
      theme="light"
      transition: Bounce
      />
    </>
  )
}

export default App

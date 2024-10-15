import React,{useState,useRef} from 'react';
import {db} from '../config/appwrite';
import Posts from './Posts';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Editor() {
	const [data,setData]=useState({});
	const [render,setRender]=useState(0);
	const ref1=useRef();
	const ref2=useRef();
	const setter=(e)=>{
		setData({...data,[e.target.name]:e.target.value});
	}
	const post=async(e)=>{
		e.preventDefault();
		try{
			const response=await db.createDocument(
				import.meta.env.VITE_DATABASE_ID,
				import.meta.env.VITE_POST_ID,
				'unique()',
				data
				)
			console.log(response);
			toast.success('Post Added');
			ref1.current.value='';
			ref2.current.value='';
			setRender(render+1)
		}
		catch(error){
			console.error(error);
		}
	}
	return (
		<div id='main'>
		<Posts prop={render}/>
		<div id="box">
		<form onSubmit={post}>
		<input type="text" name='name' placeholder='Your name' maxLength="20" required onChange={setter} ref={ref1}/>
		<textarea name='post' rows='2' maxLength="500" placeholder="What's on your mind ?" required onChange={setter} ref={ref2}/>
		<button type='submit'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-send" viewBox="0 0 14 16">
  			<path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
			</svg></button>
		</form>
		</div>
		</div>
	)
}

export default Editor

import React,{useState,useEffect} from 'react';
import Loginform from './Loginform';
import Signupform from './Signupform';
import Footer from './Footer';

function User() {
	const [flag,setFlag]=useState(false);
	useEffect(()=>{
		window.scrollTo(0,0);
	},[flag])
	return (
		<div>{
			flag?
			<div className="">
				<Signupform/>
				<p className='text-center text-sm mt-2'>Back to <span className='text-blue-500 underline underline-offset-4 cursor-pointer' onClick={()=>setFlag(!flag)}>login</span></p>
			</div>
			:
			<div className="">
				<Loginform/>
				<p className='text-center text-sm mt-2'>New user? <span className='text-blue-500 underline underline-offset-4 cursor-pointer' onClick={()=>setFlag(!flag)}>signup now</span></p>
			</div>
			}
			<Footer/>
			</div>
	)
}

export default User
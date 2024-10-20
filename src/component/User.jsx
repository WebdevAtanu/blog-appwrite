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
			<div className="grid md:grid-cols-2">
				<Signupform/>
				<div className="flex justify-center items-center">
				<img src="signup.png" alt="" className='w-2/3 aspect-square mt-3'/>
				</div>
			</div>
			:
			<div className="grid md:grid-cols-2">
				<Loginform/>
				<div className="flex justify-center items-center">
				<img src="login.png" alt="" className='w-2/3 aspect-square mt-3'/>
				</div>
			</div>
			}
			{
			flag?<p className='text-center text-sm'>Back to <span className='text-blue-500 underline underline-offset-4 cursor-pointer' onClick={()=>setFlag(!flag)}>login</span></p>:
			<p className='text-center text-sm'>New user? <span className='text-blue-500 underline underline-offset-4 cursor-pointer' onClick={()=>setFlag(!flag)}>signup now</span></p>
			}
			<Footer/>
		</div>
	)
}

export default User
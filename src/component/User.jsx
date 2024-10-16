import React,{useState} from 'react';
import Loginform from './Loginform';
import Signupform from './Signupform';
import Footer from './Footer';

function User() {
	const [flag,setFlag]=useState(false);
	return (
	<div>{
		flag?<Loginform/>:<Signupform/>
		}
		{
		flag?<p className='text-center text-sm'>New user? <span className='text-blue-500 underline underline-offset-4 cursor-pointer' onClick={()=>setFlag(!flag)}>signup now</span></p>:
		<p className='text-center text-sm'>Back to <span className='text-blue-500 underline underline-offset-4 cursor-pointer' onClick={()=>setFlag(!flag)}>login</span></p>
		}
		<Footer/>
		</div>
	)
}

export default User
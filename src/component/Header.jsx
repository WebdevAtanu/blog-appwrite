import React,{useState} from 'react';
import Home from './Home';
import Posts from './Posts';
import Loginform from './Loginform';
import Signupform from './Signupform';
import Editor from './Editor';
import Swap from './daisy/Swap'

function Header() {
	const [flag,setFlag]=useState(false);
	return (
	<div role="tablist" className="tabs tabs-lifted">
		<input type="radio" name="my_tabs" role="tab" className="tab" aria-label="Home" defaultChecked/>
		<div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
			<Home/>
		</div>
		<input type="radio" name="my_tabs" role="tab" className="tab" aria-label="Posts" />
		<div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
			<Posts/>
		</div>
		<input type="radio" name="my_tabs" role="tab" className="tab" aria-label="Login" />
		<div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
			<Loginform/>
		</div>
		<input type="radio" name="my_tabs" role="tab" className="tab" aria-label="Signup" />
		<div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
			<Signupform/>
		</div>
		{
		flag?
			<>
			<input type="radio" name="my_tabs" role="tab" className="tab" aria-label="Dashboard" />
			<div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
				<Editor/>
			</div>
			</>
		:null
		}	
	</div>
	)
}

export default Header
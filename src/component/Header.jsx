import React,{useState} from 'react';
import Home from './Home';
import Posts from './Posts';
import User from './User'
import Editor from './Editor';

function Header() {
	const [flag,setFlag]=useState(false);
	return (
	<div role="tablist" className="tabs tabs-lifted">
		<input type="radio" name="my_tabs" role="tab" className="tab" aria-label="Home" defaultChecked/>
		<div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-2">
			<Home/>
		</div>
		<input type="radio" name="my_tabs" role="tab" className="tab" aria-label="Posts" />
		<div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-2">
			<Posts/>
		</div>
		<input type="radio" name="my_tabs" role="tab" className="tab" aria-label="User" />
		<div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-2">
			<User/>
		</div>
		{
		flag?
			<>
			<input type="radio" name="my_tabs" role="tab" className="tab" aria-label="Dashboard" />
			<div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-2">
				<Editor/>
			</div>
			</>
		:null
		}	
	</div>
	)
}

export default Header
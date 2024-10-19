import React,{useState,useContext,useEffect} from 'react';
import Home from './Home';
import Posts from './Posts';
import User from './User'
import Dashboard from './Dashboard';
import Context from '../context/Context';

function Header() {
	const {flag,setFlag}=useContext(Context);
	const[option,setOption]=useState();
	useEffect(()=>{
		if(!flag){
			setOption('home');
		}
		else {
			setOption('dashboard');
		}
	},[flag]);
	
    const handleChange = (e) => {
        setOption(e.target.value);
    }
	return (
	<div role="tablist" className="tabs tabs-lifted">
		<input type="radio" name="my_tabs" role="tab" className="tab" aria-label="Home" value="home" checked={option==='home'} onChange={handleChange}/>
		<div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-2">
			<Home/>
		</div>
		<input type="radio" name="my_tabs" role="tab" className="tab" aria-label="Posts" value="posts" checked={option==='posts'} onChange={handleChange}/>
		<div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-2">
			<Posts/>
		</div>
		<input type="radio" name="my_tabs" role="tab" className="tab" aria-label="User" value="user" checked={option==='user'} onChange={handleChange}/>
		<div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-2">
			<User/>
		</div>
		{
		flag?
			<>
			<input type="radio" name="my_tabs" role="tab" className="tab" aria-label="Dashboard" value="dashboard" checked={option==='dashboard'} onChange={handleChange}/>
			<div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-2">
				<Dashboard/>
			</div>
			</>
		:null
		}	
	</div>
	)
}

export default Header
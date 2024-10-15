import React,{useState} from 'react';
import {NavLink} from 'react-router-dom';
import Modal from './Modal';

function Drawer() {
  const [flag,setFlag]=useState(false);
	return (
		<div className="drawer z-50">
  <input id="my-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    <label htmlFor="my-drawer" className="btn drawer-button"><svg xmlns="http://www.w3.org/2000/svg" width="36" height="22" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
</svg></label>
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
      <ul className='flex flex-col item-center gap-3'>
        <NavLink to='/'><li className='p-2 text-center underline underline-offset-4 text-blue-500'>Home</li></NavLink>
        <NavLink to='/post'><li className='p-2 text-center underline underline-offset-4 text-blue-500'>Posts</li></NavLink>
      <li><button className="btn btn-outline" onClick={()=>document.getElementById('login').showModal()}>Login</button></li>
      <li><button className="btn btn-outline" onClick={()=>document.getElementById('signup').showModal()}>Create Account</button></li>
      </ul>
      <Modal/>
    </ul>
  </div>
</div>
	)
}

export default Drawer
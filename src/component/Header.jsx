import React from 'react';
import {NavLink} from 'react-router-dom';
import Drawer from './daisy/Drawer';
import { Sling as Hamburger } from 'hamburger-react';

function Header() {
	return (
		<div className='flex justify-between items-center p-1 shadow'>
			<NavLink to='/'><img src="logo.png" alt="" className='w-[15%]'/></NavLink>
			<div className="inline-block">
			<Drawer/>
			</div>
		</div>
	)
}

export default Header
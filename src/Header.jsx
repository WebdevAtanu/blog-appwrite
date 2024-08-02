import React from 'react';
import {NavLink} from 'react-router-dom';

function Header() {
	return (
		<div id='header'>
			<h2>Coders Blog</h2>
			<ul>
				<li><NavLink to='/' style={({isActive})=>({borderColor:isActive?'#673AB7':'transparent'})}>HOME</NavLink></li>
				<li><NavLink to='/post' style={({isActive})=>({borderColor:isActive?'#673AB7':'transparent'})}>POSTS</NavLink></li>
			</ul>
		</div>
	)
}

export default Header
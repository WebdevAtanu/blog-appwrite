import React from 'react';
import {NavLink} from 'react-router-dom';

function Header() {
	return (
		<div id='header'>
			<h2>Coder's Blog</h2>
			<ul>
				<li><NavLink to='/' style={({isActive})=>({borderBottom:isActive?'1px solid white':'1px solid transparent'})}>HOME</NavLink></li>
				<li><NavLink to='/post' style={({isActive})=>({borderBottom:isActive?'1px solid white':'1px solid transparent'})}>POSTS</NavLink></li>
			</ul>
		</div>
	)
}

export default Header
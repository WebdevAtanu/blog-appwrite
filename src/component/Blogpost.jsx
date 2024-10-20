import React from 'react';
import {useLocation} from 'react-router-dom';

function Blogpost() {
	const location=useLocation();
	const data=location.state;
	console.log(data);
	return (
		<div>
			{data.post}
		</div>
	)
}

export default Blogpost
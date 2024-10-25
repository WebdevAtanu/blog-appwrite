import React from 'react';
import {useLocation} from 'react-router-dom';
import parse from 'html-react-parser';

function Blogpost() {
	const location=useLocation();
	const data=location.state;
	console.log(data);
	return (
		<div>
			{parse(data.post)}
		</div>
	)
}

export default Blogpost
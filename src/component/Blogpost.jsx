import React from 'react';
import {useLocation,Link} from 'react-router-dom';
import parse from 'html-react-parser';
import moment from 'moment';
import Avatar from './daisy/Avatar';

function Blogpost() {
	const location=useLocation();
	const data=location.state;
	console.log(data);
	return (
		<div className='bg-gray-100'>
		<div className="flex p-5 bg-white border-b mb-3">
			<Link to='/'>Home</Link>
		</div>
		<div className="grid md:grid-cols-4 gap-5">
		<div className="p-5 flex flex-col gap-5 bg-white col-span-3">
		<img src="default.jpg" alt="" className='w-full h-1/2'/>
		<div className="flex items-center gap-3 px-5">
            <Avatar image={'user.jpg'}/>
              <div>
                <p className="font-bold">Published by {data.name}</p>
                <p className="text-gray-500 text-xs">Posted on {moment(data.$createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
              </div>
            </div>
		<div className='px-5'>
			{parse(data.post)}		
		</div>
		</div>
		<div className="bg-white p-5">
			<div className="flex items-center gap-3 px-5">
            <Avatar image={'user.jpg'}/>
              <div>
                <p className="font-bold text-xl">{data.name}</p>
              </div>
            </div>
		</div>
		</div>
		</div>
	)
}

export default Blogpost
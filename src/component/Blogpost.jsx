import React,{useEffect,useContext} from 'react';
import {useLocation,Link} from 'react-router-dom';
import parse from 'html-react-parser';
import moment from 'moment';
import Avatar from './daisy/Avatar';
import Posts from './Posts'
import Footer from './Footer'
import Context from '../context/Context';
import Card from './daisy/Card';
import Stars from './daisy/Stars';

function Blogpost() {
	const location=useLocation();
	const {post,index}=location.state;
	const {data}=useContext(Context);
	useEffect(()=>{
		scrollTo(0,0);
	})
	return (
		<>
		<div className='bg-gray-100'>
		{/* top header */}
			<div className="flex p-3 bg-white border-b mb-3 sticky top-0 z-10">
				<div className="breadcrumbs text-sm">
					<ul>
						<li><Link to='/'>Home</Link></li>
						<li>id: {post.$id}</li>
					</ul>
				</div>
			</div>

			<div className="grid md:grid-cols-4 gap-5">

			{/* main post */}
				<div className="p-5 flex flex-col gap-5 bg-white md:col-span-3">
					<img src="default.jpg" alt="" className='w-full h-1/6'/>
					<div className="flex items-center gap-3 px-5">
						<Avatar image={'user.jpg'}/>
							<div>
								<p className="font-bold">Published by {post.name}</p>
								<p className="text-gray-500 text-xs">Posted on {moment(post.$createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
							</div>
					</div>
						<div className='px-5'>
							<h1 className='mb-3'>{post.title}</h1>
							{parse(post.post)}
						</div>
						<div className="flex items-center gap-2 px-5">
							<p>Feedback</p>
							<Stars/>
						</div>
				</div>

			{/* other blogs */}
					<div className="bg-white md:col-span-1 p-5">
						<div>
							<div>
								<p className='mb-5 font-bold underline underline-offset-4'>See also</p>
								{
								data.length==index+1?
								<div className="flex w-52 flex-col gap-4">
									<div className="skeleton h-32 w-full"></div>
									<div className="skeleton h-4 w-28"></div>
									<div className="skeleton h-4 w-full"></div>
									<div className="skeleton h-4 w-full"></div>
								</div>
								:
								<div className='flex flex-col gap-3'>
									{data.slice(index+1,data.length+1).map((item, i) => (
									<Card post={item} key={i}/>
									))}
								</div>
								}
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer/>
				</>
	)
}

export default Blogpost
import React from 'react';
import Footer from './Footer';
import Posts from './Posts';


function Home() {
	return (
		<div className=''>
			<div className='grid md:grid-cols-2 bg-gray-100 p-5'>
				<div className='flex flex-col items-baseline justify-between'>
					<div>
						<p className='text-5xl'>Techdown</p>
						<p className='text'>One byte at a time</p>
					</div>
					<p className='mt-3'>A tech blog is a platform where individuals or organizations share insights, tutorials, and updates about the latest advancements in technology. It covers a broad range of topics, from software development and programming languages to gadgets, AI, cybersecurity, and more.</p>
				</div>
			</div>
			<ul className="menu menu-horizontal">
				<li className='underline underline-offset-4'><a>Relevent</a></li>
				<li><a>Latest</a></li>
				<li><a>Top</a></li>
			</ul>
			<Posts/>
		</div>
	)
}

export default Home
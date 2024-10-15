import React from 'react';

function Home() {
	return (
		<div className=''>
			<div className='grid md:grid-cols-2 bg-gray-100 p-5'>
			<div className='flex flex-col items-baseline justify-between gap-5'>
				<p className='text-5xl'>Coder's Blog</p>
				<p>A tech blog is a platform where individuals or organizations share insights, tutorials, and updates about the latest advancements in technology. It covers a broad range of topics, from software development and programming languages to gadgets, AI, cybersecurity, and more.</p> 
				<p>Tech blogs serve as valuable resources for both beginners and professionals, offering practical advice, in-depth analysis, and problem-solving techniques. Writing a tech blog can not only establish your expertise in a specific field but also help you build a community, stay updated with industry trends, and contribute to the broader tech ecosystem.</p>
				<button className='bg-violet-800 hover:bg-violet-900 px-4 py-2 rounded text-white'>Join now</button>
			</div>
				<img src="pic.png" alt="" className=''/>
			</div>
		</div>
	)
}

export default Home
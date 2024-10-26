import React from 'react';
import Footer from './Footer';

function About() {
	return (
		<>
		<div className="bg-base-200 p-6">
  <div className="flex flex-col gap-5">
    <div>
      <h2 className="text-5xl font-bold">About Techdown</h2>
      <p className="mt-5">Techdown is an innovative blog website dedicated to exploring the latest trends and advancements in technology. With a user-friendly interface and a sleek design, Techdown provides a comprehensive platform for tech enthusiasts, industry professionals, and casual readers alike. The blog covers a wide range of topics, including gadget reviews, software updates, artificial intelligence, cybersecurity, and emerging tech trends.</p>
      <p className="mt-5">Each post is meticulously researched and written to ensure readers receive accurate and engaging content. The website also features expert opinions, interviews with industry leaders, and in-depth analysis of current tech events, making it a go-to resource for anyone looking to stay informed. Additionally, Techdown fosters a vibrant community through its comment sections and social media integration, encouraging discussions and debates on the latest tech innovations.</p>
    </div>
    <img src="blog.jpg" className="w-1/2 rounded-lg shadow-2xl m-auto"/>
  </div>
</div>
<Footer/>
</>
	)
}

export default About
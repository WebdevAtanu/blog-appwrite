import React from 'react'

function Footer() {
	return (
		<footer className="grid grid-cols-2 md:grid-cols-3 gap-5 bg-slate-900 text-white p-5 mt-5">
			<nav className='flex flex-col'>
				<h6 className="footer-title">Services</h6>
				<a className="link link-hover">Branding</a>
				<a className="link link-hover">Design</a>
				<a className="link link-hover">Marketing</a>
				<a className="link link-hover">Advertisement</a>
			</nav>
			<nav className='flex flex-col'>
				<h6 className="footer-title">Company</h6>
				<a className="link link-hover">About us</a>
				<a className="link link-hover">Contact</a>
				<a className="link link-hover">Jobs</a>
				<a className="link link-hover">Press kit</a>
			</nav>
			<nav className='flex flex-col'>
				<h6 className="footer-title">Legal</h6>
				<a className="link link-hover">Terms of use</a>
				<a className="link link-hover">Privacy policy</a>
				<a className="link link-hover">Cookie policy</a>
			</nav>
		</footer>
	)
}

export default Footer
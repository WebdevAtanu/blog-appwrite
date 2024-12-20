import React from 'react'

function Footer() {
	return (
		<footer className="grid md:grid-cols-4 grid-cols-3 gap-3 bg-slate-900 text-white p-5 mt-5">
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
			<form>
				<h6 className="footer-title">Newsletter</h6>
				<fieldset className="form-control">
					<div className="join">
						<input
						type="text"
						placeholder="username@site.com"
						className="input input-bordered join-item text-black" />
						<button className="btn btn-primary join-item">Subscribe</button>
					</div>
				</fieldset>
			</form>
		</footer>
	)
}

export default Footer
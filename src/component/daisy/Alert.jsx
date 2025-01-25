import React from 'react'

function Alert() {
	window.onload=function (){
		document.getElementById('my_modal_3').showModal();
	}
	return (
		<div>
			<dialog id="my_modal_3" className="modal">
			<div className="modal-box">
				<form method="dialog">
					<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
				</form>
				<h3 className="font-bold">Hey there, welcome to Techdown !!</h3>
				<p className="py-2">This blog project is using <a href="https://appwrite.io/" target='_blank' className='link link-primary'>Appwrite</a> services.</p>
			</div>
			</dialog>
		</div>
	)
}

export default Alert
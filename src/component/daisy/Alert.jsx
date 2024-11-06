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
				<h3 className="font-bold">Hey there!!</h3>
				<p className="py-2">This project is incomplete right now. I am currently working on it.</p>
			</div>
			</dialog>
		</div>
	)
}

export default Alert
import React from 'react'

function Avatar(prop) {
	return (
	<div className="avatar">
		<div className="ring ring-offset-base-100 w-8 rounded-full ring ring-offset-2">
			<img src={prop.image}/>
		</div>
	</div>
	)
}

export default Avatar
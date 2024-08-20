import React,{useState,useEffect} from 'react';
import {db} from '../config/appwrite';

function Fetching(prop) {
	const [data,setData]=useState([]);
	const [flag,setFlag]=useState(true);
	useEffect(()=>{
		const fetchData = async () => {
            try {
                const response = await db.listDocuments(
                	import.meta.env.VITE_DATABASE_ID,
                	import.meta.env.VITE_POST_ID);
                	setData(response.documents);
                	setFlag(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setFlag(true);
            }
        };
        fetchData();
	},[prop.prop])
	const show=()=>{
		console.log(data[0]);
	}
	return (
		<>
		{
			flag?<div id='loader'><img src="loader.gif" alt=""/></div>:
			<div id='postbox'>
		{
			data?.map((item,i)=>{
				return(
					<div key={i} className='posts'>
						<div className="avatar">
						<img src="user.jpg" alt="" id='avatar'/>
						<div>
						<div id='name'>{item.name}</div>
						<div id='date'>Published by {item.name} on {item.$createdAt.slice(0,10)}</div>
						</div>
						</div>
						<div id='post'>{item.post}</div>
					</div>
					)
			})
         }
		</div>
		}
		</>
	)
}

export default Fetching
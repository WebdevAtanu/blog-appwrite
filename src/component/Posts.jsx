import React, { useState, useEffect,useContext } from 'react';
import { db } from '../config/appwrite';
import moment from 'moment';
import Card from './daisy/Card';
import Skeleton from './daisy/Skeleton';
import Context from '../context/Context';
import { toast } from 'react-toastify';

function Posts() {
  const {postcount,data,setData}=useContext(Context);
    const fetchData = async() => {
        try {
            const response = await db.listDocuments(
                import.meta.env.VITE_DATABASE_ID,
                import.meta.env.VITE_POST_ID
            );
            setData(response.documents);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Something went wrong! Server is not working');
        }
    }
    useEffect(() => {
        fetchData();
    }, [postcount]);

  return (
    <>{
    data.length!=0?
        <div className='grid md:grid-cols-4 gap-3 mt-5'>
            {data?.reverse().map((item, i) => (
            <Card post={item} key={i} index={i}/>
            ))}
        </div>
    :
        <div className="flex justify-center items-center mt-5 p-5">
            <span className="loading loading-bars loading-lg"></span>
        </div>
    }
    </>
  );
}

export default Posts;

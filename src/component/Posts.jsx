import React, { useState, useEffect } from 'react';
import { db } from '../config/appwrite';
import moment from 'moment';
import Card from './daisy/Card';
import Skeleton from './daisy/Skeleton';

function Posts(prop) {
  const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await db.listDocuments(
                    import.meta.env.VITE_DATABASE_ID,
                    import.meta.env.VITE_POST_ID
                );
                setData(response.documents);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [prop.prop]);

  return (
    <div className='grid md:grid-cols-4 gap-3'>
      {data?.map((item, i) => (
      <Card data={item} key={i}/>
      ))}
    </div>
    
  );
}

export default Posts;

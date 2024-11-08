import React from 'react';
import moment from 'moment';
import Avatar from './Avatar'
import {Link} from 'react-router-dom';
import { storage } from '../../config/appwrite';

function Card(prop) {
  const image = storage.getFileView(
    import.meta.env.VITE_BUCKET_ID,
    prop.post.picture
);
  return (
    <Link to='/blogpost' state={{ post: prop.post, index: prop.index,image:image }}>
    <div className="border border-gray-400 shadow flex flex-col justify-between h-full group">
      <div>
        <figure>
          <img src={image || "default.jpg"} alt="image" className='w-full aspect-video' />
        </figure>
        <div className="p-5 flex flex-col">
          <div className="flex items-center gap-3 mb-3">
            <Avatar image={'user.jpg'}/>
              <div>
                <p className="text-sm">Published by {prop.post.name}</p>
                <p className="text-gray-500 text-xs">{moment(prop.post.$createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
              </div>
            </div>
            <h1 className='group-hover:text-blue-800 mt-1'>{prop.post.title}</h1>
          </div>
        </div>
      </div>
      </Link>
  )
}

export default Card

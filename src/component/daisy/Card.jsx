import React from 'react';
import moment from 'moment';
import Avatar from './Avatar'
import {Link} from 'react-router-dom';
import parse from 'html-react-parser';

function Card(prop) {
  return (
    <Link to='/blogpost' state={{ post: prop.post, index: prop.index }}>
    <div className="border border-gray-400 shadow flex flex-col justify-between h-full hover:bg-gray-100 group">
      <div>
        <figure>
          <img src="default.jpg" alt="image" className='w-full aspect-video'/>
        </figure>
        <div className="p-5 flex flex-col">
          <div className="flex items-center gap-3 mb-3">
            <Avatar image={'user.jpg'}/>
              <div>
                <p className="text-xs">Published by {prop.post.name}</p>
                <p className="text-gray-500 text-xs">{moment(prop.post.$createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
              </div>
            </div>
            <h1 className='mt-1'>{prop.post.title}</h1>
          </div>
        </div>
        <div className="text-grey-500 group-hover:text-black text-end px-5 pb-2 text-sm">
        Read<i className="bi bi-chevron-double-right"></i>
        </div>
      </div>
      </Link>
  )
}

export default Card

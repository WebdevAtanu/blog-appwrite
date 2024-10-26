import React from 'react';
import moment from 'moment';
import Avatar from './Avatar'
import {Link} from 'react-router-dom';
import parse from 'html-react-parser';

function Card(prop) {
  return (
    <Link to='/blogpost' state={prop.data}>
    <div className="border border-gray-400 shadow flex flex-col justify-between">
      <div>
        <figure>
          <img src="default.jpg" alt="image" className='w-full aspect-video'/>
        </figure>
        <div className="p-5 flex flex-col">
          <div className="flex items-center gap-3 mb-3">
            <Avatar image={'user.jpg'}/>
              <div>
                <p className="text-xs">Published by {prop.data.name}</p>
                <p className="text-gray-500 text-xs">{moment(prop.data.$createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
              </div>
            </div>
            <div className='mt-1'>{parse(prop.data.post.slice(0,100))}</div>
          </div>
        </div>
      </div>
      </Link>
  )
}

export default Card

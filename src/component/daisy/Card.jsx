import React from 'react';
import moment from 'moment';
import Avatar from './Avatar'
import {Link} from 'react-router-dom';
import parse from 'html-react-parser';

function Card(prop) {
  return (
    <div className="border border-gray-400 shadow flex flex-col justify-between">
      <div>
        <figure>
          <img src="default.jpg" alt="image" className='w-full aspect-video'/>
        </figure>
        <div className="p-5 flex flex-col">
          <div className="flex items-center gap-3 mb-3">
            <Avatar image={'user.jpg'}/>
              <div>
                <p className="text-gray-500 text-xs">Published by {prop.data.name} on {moment(prop.data.$createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
              </div>
            </div>
            <div>{parse(prop.data.post.slice(0,100))}</div>
          </div>
        </div>
        <div className="card-actions p-5 justify-end">
          <Link to='/blogpost' state={prop.data}><p className="text-sm text-blue-900 hover:underline underline-offset-4">Read More<i className="bi bi-chevron-double-right"></i></p></Link>
        </div>
      </div>
  )
}

export default Card

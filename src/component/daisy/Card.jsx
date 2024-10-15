import React from 'react';
import moment from 'moment';
import Avatar from './Avatar'

function Card(prop) {
  return (
    <div className="border border-gray-500 bg-base-100 flex flex-col justify-between">
      <figure>
        <img
        src="https://www.littlethings.info/wp-content/uploads/2014/04/dummy-image-green-e1398449160839.jpg"
        alt="image" />
      </figure>
      <div className="p-5 flex flex-col justify-between">
        <div className="flex items-center gap-3 mb-3">
          <Avatar image={'user.jpg'}/>
            <div>
              <p className="text-gray-500 text-sm">Published by {prop.data.name} on {moment(prop.data.$createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
            </div>
          </div>
          <p>{prop.data.post.slice(0,100)}...</p>
          <div className="card-actions justify-end">
            <button className="text-sm text-blue-900 hover:underline underline-offset-4">Explore More >></button>
          </div>
        </div>
      </div>
  )
}

export default Card

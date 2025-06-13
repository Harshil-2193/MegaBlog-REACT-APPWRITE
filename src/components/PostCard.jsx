import React from 'react'
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'



const PostCard = ({$id, title, featuredImage}) => {
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4  hover:shadow-lg transition'>
            <div className='w-full justify-center mb-4'>
                <img 
                    loading='lazy'
                    src={appwriteService.getFilePreview(featuredImage)} 
                    alt={title} 
                    className='rounded-xl'
                />
            </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>

        </div>

    </Link>
  )
}

PostCard.PropTypes = {
    $id: PropTypes.string.isRequired,
    title:PropTypes.string.isRequired,
}

export default PostCard

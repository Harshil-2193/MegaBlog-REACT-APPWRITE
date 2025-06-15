import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const PostCard = ({ $id, title, featuredImage }) => {
  return (
    <Link to={`/post/${$id}`} className="group">
      <div className="w-full bg-white rounded-2xl p-4 shadow-md border border-gray-200 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
        <div className="w-full mb-4 rounded-xl overflow-hidden">
          <img
            loading="lazy"
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h2 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition">
          {title}
        </h2>
      </div>
    </Link>
  );
};

PostCard.propTypes = {
  $id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  featuredImage: PropTypes.string.isRequired,
};

export default PostCard;

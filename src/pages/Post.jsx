import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";

const Post = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    const getPost = async () => {
      try {
        const post = await appwriteService.getPost(slug);
        if (post) {
          setPost(post);
        } else {
          navigate("/");
        }
      } catch (err) {
        console.error("Error fetching post:", err);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      getPost();
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete this post? This action is irreversible."
      )
    ) {
      return;
    }

    try {
      setDeleting(true);
      const status = await appwriteService.deletePost(post.$id);
      if (status) {
        await appwriteService.deleteFile(post.featuredImage);
        alert("Post deleted successfully.");
        navigate("/");
      } else {
        alert("Failed to delete post.");
      }
    } catch (err) {
      console.error("Error deleting post:", err);
      alert("An error occurred while deleting the post.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
        <p className="text-white text-xl font-semibold">Loading Post...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
        <p className="text-white text-xl font-semibold">Post not found.</p>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 min-h-screen">
      <Container>
        <div className="w-full flex justify-center mb-8 relative border rounded-2xl p-4 bg-white shadow-2xl">
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl max-h-[600px] object-cover"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6 flex gap-4">
              <Link to={`/edit-post/${post.$id}`}>
                <Button className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg px-4 py-2 shadow-md">
                  Edit
                </Button>
              </Link>
              <Button
                onClick={deletePost}
                disabled={deleting}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg px-4 py-2 shadow-md"
              >
                {deleting ? "Deleting..." : "Delete"}
              </Button>
            </div>
          )}
        </div>

        <div className="w-full mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">
            {post.title}
          </h1>
        </div>

        <div className="browser-css bg-white p-8 rounded-xl shadow-xl">
          {parse(post.content)}
        </div>
      </Container>
    </div>
  );
};

export default Post;

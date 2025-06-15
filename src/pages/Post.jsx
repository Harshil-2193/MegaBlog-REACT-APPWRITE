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
      <div className="flex justify-center items-center h-screen">
        <p>Loading Post...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Post not found.</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6 flex gap-3">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500">Edit</Button>
              </Link>
              <Button
                bgColor="bg-red-500"
                onClick={deletePost}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete"}
              </Button>
            </div>
          )}
        </div>

        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>

        <div className="browser-css">{parse(post.content)}</div>
      </Container>
    </div>
  );
};

export default Post;

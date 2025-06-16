import React, { useEffect, useState } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from "../appwrite/config";

const Home = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsData = await appwriteService.getPosts();
                setPosts(postsData.documents || []);
            } catch (error) {
                console.error("Error fetching posts:", error);
                setPosts([]);
            }
        };
        fetchPosts();
    }, []);

    if (posts.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#0f0c29] via-[#302b63] to-[#24243e] px-4 rounded-xl">
                <Container>
                    <div className="flex flex-col items-center justify-center text-center">
                        <h1 className="text-4xl font-extrabold text-white drop-shadow-lg mb-4">
                            No Posts Found
                        </h1>
                        <p className="text-lg text-gray-300">
                            Login to read posts and start exploring amazing content.
                        </p>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-12 bg-gradient-to-tr from-[#0f0c29] via-[#302b63] to-[#24243e] px-4 rounded-xl">
            <Container>
                <h1 className="text-4xl font-extrabold text-white text-center mb-10 drop-shadow-lg">
                    Explore Posts
                </h1>
                <div className="flex flex-wrap justify-center gap-8">
                    {posts.map((post) => (
                        <div key={post.$id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default Home;

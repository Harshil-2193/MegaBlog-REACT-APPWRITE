import React, {useEffect, useState} from 'react'
import { Container, PostCard } from '../components'
import { useNavigate, useParams } from 'react-router-dom';
import appwriteService from "../appwrite/config"

const Home = () => {

    const [posts,setPosts]= useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            const postsData = await appwriteService.getPosts();
            setPosts(postsData.documents);
        }
        fetchPosts();
    }, []);

    if(posts.length === 0){
        return  (
            <div className='w-full py-8 mt-4 text-center'>
                <Container>
                    <div className='flex flex-wrap'>
                        <div className='p-2 w-full'>
                            <h1
                            className='text-2xl font-bold hover:text-gray-500'
                            >Login to read posts</h1>

                        </div>

                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                        {posts.map((post)=>(
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post}/>
                            </div>
                        ))}

                </div>
            </Container>
        </div>
    )
    
}

export default Home

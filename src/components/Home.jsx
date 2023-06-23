import React, { useState, useEffect } from 'react'
import PostCard from './PostCard';

export default function Home(props) {
    const [posts, setPosts] = useState([]);

   // eslint-disable-next-line no-undef
   useEffect(() => {
        fetch("https://car-model-ihwy.onrender.com/api/posts")
            .then(res => res.json())
            .then(data => setPosts(data))
    },[])

    return (
        <>
            <h1 className="text-center">Welcome to Mercy Motors</h1>
            {posts.map( post => <PostCard key={post.id} post={post} flashMessage={props.flashMessage}/>)}
        </>
    )
}
import React, { useState, useEffect } from 'react'
import PostCard from './PostCard';

export default function Home(props) {
    const [posts, setPosts] = useState([]);

   // eslint-disable-next-line no-undef
   useEffect(() => {
        fetch("http://127.0.0.1:5000/api/posts")
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
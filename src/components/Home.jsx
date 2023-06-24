import React, { useState, useEffect } from 'react'
import PostCard from './PostCard';
import { Link } from 'react-router-dom'

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
        {props.loggedIn || props.value ? (
            <>
            <h1 className="text-center">Mercy's Motors Inventory</h1>
            {posts.map( post => <PostCard key={post.id} post={post} flashMessage={props.flashMessage}/>)}
            </>
        ) : (
            <>    
            <h1 className="text-center">Welcome Mercy's Motors</h1>
            <Link className='btn btn-warning' to='/login'>Login to Acess Inventory</Link>
            </>
        )}
        </>
    )
}
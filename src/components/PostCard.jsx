import React from 'react';
import { useNavigate } from 'react-router-dom'


export default function PostCard ({ post, flashMessage }) {
    
    const navigate = useNavigate();

    function handleEdit(){
        navigate('/edit');
        localStorage.setItem("id", post.id)
    }

    async function handleDelete(){
        let id = post.id;
        let brand = post.brand;
        let model = post.model;

        // Get the token from localStorage
        let token = localStorage.getItem('token');

        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json')
        myHeaders.append('Authorization', `Bearer ${token}`);

        let requestBody = JSON.stringify({brand, model})
        // Make the fetch request
        let response = await fetch(`https://car-model-ihwy.onrender.com/api/post/delete/${id}`, {
            method: 'POST',
            headers: myHeaders,
            body: requestBody
        })

        if (response.ok){
            flashMessage(`Car brand has been deleted`, 'primary')
            setTimeout(() => {}, 1000)
            window.location.reload()

        } else {
            flashMessage("There was an issue, please try again", 'warning');
        }
    }
    

    return (
        <>
        <div className="card m-3">
            <div className="card-body">
                <h5 className="card-title" name="brand">{post.brand}</h5>
                <p className="card-text" name="model">{post.model} </p>
                <button className='btn btn-primary' onClick={handleEdit}>Edit Post</button>
                <button className='btn btn-danger' onClick={handleDelete}> Delete</button>
            </div>
        </div>
        </>
    )
}